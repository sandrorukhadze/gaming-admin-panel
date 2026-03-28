import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { AppModal } from '@/shared/ui/AppModal';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useCreateLeaderboardPrize } from '../../hooks/useCreateLeaderboardPrize';
import type { LeaderboardPrize } from '../../model/leaderboard.types';
import { createPrizeSchema, type CreatePrizeFormInput, type CreatePrizeFormValues } from '../../model/leaderboard-prize.schema';


interface CreatePrizeModalProps {
  open: boolean;
  onClose: () => void;
  existingPrizes: LeaderboardPrize[];
}

function getNextRank(existingPrizes: LeaderboardPrize[]): number {
  if (existingPrizes.length === 0) {
    return 1;
  }

  const sortedRanks = [...existingPrizes]
    .map((item) => item.rank)
    .sort((a, b) => a - b);

  const isSequential = sortedRanks.every((rank, index) => rank === index + 1);

  if (!isSequential) {
    return sortedRanks.length + 1;
  }

  return sortedRanks.length + 1;
}

function getDefaultValues(): CreatePrizeFormInput {
  return {
    name: '',
    type: 'coins',
    amount: '',
    imageUrl: '',
  };
}

export function CreatePrizeModal({
  open,
  onClose,
  existingPrizes,
}: CreatePrizeModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const nextRank = useMemo(() => getNextRank(existingPrizes), [existingPrizes]);

  const { mutateAsync, isPending } = useCreateLeaderboardPrize();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CreatePrizeFormInput, unknown, CreatePrizeFormValues>({
    resolver: zodResolver(createPrizeSchema),
    defaultValues: getDefaultValues(),
  });

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

  async function onSubmit(values: CreatePrizeFormValues) {
    const payload: LeaderboardPrize = {
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
        message: 'Prize created successfully',
        severity: 'success',
      });

      reset(getDefaultValues());
      onClose();
    } catch {
      setToast({
        open: true,
        message: 'Failed to create prize',
        severity: 'error',
      });
    }
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Add Prize">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Rank"
              type="number"
              value={nextRank}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              helperText="Rank is assigned automatically"
            />

            <TextField
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              select
              label="Type"
              defaultValue="coins"
              {...register('type')}
              error={!!errors.type}
              helperText={errors.type?.message}
            >
              <MenuItem value="coins">Coins</MenuItem>
              <MenuItem value="freeSpin">Free Spin</MenuItem>
              <MenuItem value="bonus">Bonus</MenuItem>
            </TextField>

            <TextField
              label="Amount"
              type="number"
              {...register('amount')}
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />

            <TextField
              label="Image URL"
              {...register('imageUrl')}
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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