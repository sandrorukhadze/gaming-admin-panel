import { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppModal } from '@/shared/ui/AppModal';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useUpdateLeaderboard } from '../hooks/useUpdateLeaderboard';
import {
  createLeaderboardSchema,
  type CreateLeaderboardFormInput,
  type CreateLeaderboardFormValues,
} from '../model/leaderboard.schema';
import type { Leaderboard } from '../model/leaderboard.types';

interface EditLeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  leaderboard: Leaderboard | null;
}

function getDefaultValues(): CreateLeaderboardFormInput {
  return {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'draft',
    scoringType: 'points',
    maxParticipants: '' as unknown as number,
  };
}

export function EditLeaderboardModal({
  open,
  onClose,
  leaderboard,
}: EditLeaderboardModalProps) {
  const { mutateAsync, isPending } = useUpdateLeaderboard();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreateLeaderboardFormInput, unknown, CreateLeaderboardFormValues>({
    resolver: zodResolver(createLeaderboardSchema),
    defaultValues: getDefaultValues(),
  });

  useEffect(() => {
    if (!leaderboard) {
      reset(getDefaultValues());
      return;
    }

    reset({
      title: leaderboard.title,
      description: leaderboard.description,
      startDate: leaderboard.startDate.slice(0, 16),
      endDate: leaderboard.endDate.slice(0, 16),
      status: leaderboard.status,
      scoringType: leaderboard.scoringType,
      maxParticipants: leaderboard.maxParticipants,
    });
  }, [leaderboard, reset]);

  function handleClose() {
    if (isDirty) {
      setIsConfirmOpen(true);
      return;
    }

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

  async function onSubmit(values: CreateLeaderboardFormValues) {
    if (!leaderboard) {
      return;
    }

    const payload: Leaderboard = {
      ...leaderboard,
      title: values.title,
      description: values.description,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      status: values.status,
      scoringType: values.scoringType,
      maxParticipants: values.maxParticipants,
      updatedAt: new Date().toISOString(),
    };

    await mutateAsync({
      id: leaderboard.id,
      payload,
    });

    reset(getDefaultValues());
    onClose();
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Edit Leaderboard">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Title"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              multiline
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="Start Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register('startDate')}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />

            <TextField
              label="End Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register('endDate')}
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
            />

            <TextField
              select
              label="Status"
              defaultValue="draft"
              {...register('status')}
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
              {...register('scoringType')}
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
              {...register('maxParticipants')}
              error={!!errors.maxParticipants}
              helperText={errors.maxParticipants?.message}
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
                Save
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
    </>
  );
}