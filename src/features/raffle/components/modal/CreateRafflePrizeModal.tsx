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
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useCreateRafflePrize } from "../../hooks/useCreateRafflePrize";
import {
  createRafflePrizeSchema,
  type CreateRafflePrizeFormInput,
  type CreateRafflePrizeFormValues,
} from "../../model/raffle-prize.schema";
import type { RafflePrize } from "../../model/raffle.types";

interface CreateRafflePrizeModalProps {
  open: boolean;
  onClose: () => void;
  existingPrizes: RafflePrize[];
}

function getNextRank(prizes: RafflePrize[]): number {
  if (prizes.length === 0) {
    return 1;
  }

  return Math.max(...prizes.map((item) => item.rank)) + 1;
}

function getDefaultValues(): CreateRafflePrizeFormInput {
  return {
    name: "",
    type: "coins",
    amount: 1,
    imageUrl: "",
  };
}

export function CreateRafflePrizeModal({
  open,
  onClose,
  existingPrizes,
}: CreateRafflePrizeModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const nextRank = useMemo(() => getNextRank(existingPrizes), [existingPrizes]);

  const { mutateAsync, isPending } = useCreateRafflePrize();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CreateRafflePrizeFormInput, unknown, CreateRafflePrizeFormValues>(
    {
      resolver: zodResolver(createRafflePrizeSchema),
      defaultValues: getDefaultValues(),
    },
  );

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

  function handleConfirmClose() {
    reset(getDefaultValues());
    setIsConfirmOpen(false);
    onClose();
  }

  function handleCancelClose() {
    setIsConfirmOpen(false);
  }

  async function onSubmit(values: CreateRafflePrizeFormValues) {
    const payload: RafflePrize = {
      id: crypto.randomUUID(),
      rank: nextRank,
      name: values.name,
      type: values.type,
      amount: values.amount,
      imageUrl: values.imageUrl,
    };

    try {
      await mutateAsync(payload);

      setToast({
        open: true,
        message: "Prize created successfully",
        severity: "success",
      });

      reset(getDefaultValues());
      onClose();
    } catch {
      setToast({
        open: true,
        message: "Failed to create prize",
        severity: "error",
      });
    }
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Add Raffle Prize">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Rank"
              value={nextRank}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              helperText="Rank is assigned automatically"
            />

            <TextField
              label="Prize Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              select
              label="Type"
              defaultValue="coins"
              {...register("type")}
              error={!!errors.type}
              helperText={errors.type?.message}
            >
              <MenuItem value="coins">Coins</MenuItem>
              <MenuItem value="freeSpin">Free Spin</MenuItem>
              <MenuItem value="bonus">Bonus</MenuItem>
            </TextField>

            <TextField
              label="Quantity"
              type="number"
              {...register("amount")}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />

            <TextField
              label="Image URL"
              {...register("imageUrl")}
              error={!!errors.imageUrl}
              helperText={errors.imageUrl?.message}
            />

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || isPending}
              >
                Add Prize
              </Button>
            </Stack>
          </Stack>
        </Box>
      </AppModal>

      <ConfirmModal
        open={isConfirmOpen}
        title="Discard changes?"
        description="You have unsaved changes. Are you sure you want to leave?"
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          variant="filled"
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}
