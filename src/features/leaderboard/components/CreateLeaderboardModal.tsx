import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppModal } from "@/shared/ui/AppModal";

import {
  createLeaderboardSchema,
  type CreateLeaderboardFormInput,
  type CreateLeaderboardFormValues,
} from "../model/leaderboard.schema";
import type { Leaderboard } from "../model/leaderboard.types";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useCreateLeaderboard } from "../hooks/useCreateLeaderboard";
import { getNextId } from "@/shared/lib/getNextId";

interface CreateLeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  existingLeaderboards: Leaderboard[];
}

function getDefaultValues(): CreateLeaderboardFormInput {
  return {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "draft",
    scoringType: "points",
    maxParticipants: "" as unknown as number,
  };
}

export function CreateLeaderboardModal({
  open,
  onClose,
  existingLeaderboards, // 👈 ესეც
}: CreateLeaderboardModalProps) {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CreateLeaderboardFormInput, unknown, CreateLeaderboardFormValues>(
    {
      resolver: zodResolver(createLeaderboardSchema),
      defaultValues: useMemo(() => getDefaultValues(), []),
    },
  );

  const { mutateAsync, isPending } = useCreateLeaderboard();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      reset(getDefaultValues());
    }
  }, [open, reset]);

  function handleClose() {
    if (isDirty) {
      setIsConfirmOpen(true);
      return;
    }

    reset(getDefaultValues());
    onClose();
  }

  async function onSubmit(values: CreateLeaderboardFormValues) {
    const now = new Date().toISOString();

    const newId = getNextId(existingLeaderboards);

    const payload: Leaderboard = {
      id: newId,
      title: values.title,
      description: values.description,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      status: values.status,
      scoringType: values.scoringType,
      prizes: [],
      maxParticipants: values.maxParticipants,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await mutateAsync(payload);

      setToast({
        open: true,
        message: "Created successfully",
        severity: "success",
      });

      reset(getDefaultValues());
      onClose();
    } catch {
      setToast({
        open: true,
        message: "Error creating leaderboard",
        severity: "error",
      });
    }
  }

  function handleConfirmClose() {
    setIsConfirmOpen(false);
    reset(getDefaultValues());
    onClose();
  }

  function handleCancelClose() {
    setIsConfirmOpen(false);
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Create Leaderboard">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              multiline
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Start Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register("startDate")}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />

            <TextField
              label="End Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register("endDate")}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />

            <TextField
              select
              label="Status"
              defaultValue="draft"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>

            <TextField
              select
              label="Scoring Type"
              defaultValue="points"
              {...register("scoringType")}
              error={!!errors.scoringType}
              helperText={errors.scoringType?.message}
            >
              <MenuItem value="points">Points</MenuItem>
              <MenuItem value="wins">Wins</MenuItem>
              <MenuItem value="wagered">Wagered</MenuItem>
            </TextField>

            <TextField
              label="Max Participants"
              type="number"
              {...register("maxParticipants")}
              error={!!errors.maxParticipants}
              helperText={errors.maxParticipants?.message}
            />

            <Stack direction="row" justifyContent="flex-end">
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || isPending}
              >
                Create
              </Button>
            </Stack>
          </Stack>
        </Box>
      </AppModal>

      <ConfirmModal
        open={isConfirmOpen}
        title="Discard changes?"
        description="You have unsaved changes. Are you sure you want to leave?"
        confirmText="Discard"
        cancelText="Stay"
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      >
        <Alert severity={toast.severity}>{toast.message}</Alert>
      </Snackbar>
    </>
  );
}
