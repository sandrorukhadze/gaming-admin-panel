import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppModal } from '@/shared/ui/AppModal';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useCreateRaffle } from '../../hooks/useCreateRaffle';
import {
  createRaffleSchema,
  type CreateRaffleFormInput,
  type CreateRaffleFormValues,
} from '../../model/raffle.schema';
import type { Raffle } from '../../model/raffle.types';

interface CreateRaffleModalProps {
  open: boolean;
  onClose: () => void;
}

function getDefaultValues(): CreateRaffleFormInput {
  return {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    drawDate: '',
    status: 'draft',
    ticketPrice: '',
    maxTicketsPerUser: 1,
    totalTicketLimit: null,
  };
}

export function CreateRaffleModal({
  open,
  onClose,
}: CreateRaffleModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const { mutateAsync, isPending } = useCreateRaffle();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CreateRaffleFormInput, unknown, CreateRaffleFormValues>({
    resolver: zodResolver(createRaffleSchema),
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

  async function onSubmit(values: CreateRaffleFormValues) {
    const now = new Date().toISOString();

    const payload: Raffle = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      startDate: new Date(values.startDate).toISOString(),
      endDate: new Date(values.endDate).toISOString(),
      drawDate: new Date(values.drawDate).toISOString(),
      status: values.status,
      ticketPrice: values.ticketPrice,
      maxTicketsPerUser: values.maxTicketsPerUser,
      totalTicketLimit: values.totalTicketLimit,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await mutateAsync(payload);

      setToast({
        open: true,
        message: 'Raffle created successfully',
        severity: 'success',
      });

      reset(getDefaultValues());
      onClose();
    } catch {
      setToast({
        open: true,
        message: 'Failed to create raffle',
        severity: 'error',
      });
    }
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Create Raffle">
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Description"
              multiline
              minRows={3}
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
              label="Draw Date"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register('drawDate')}
              error={!!errors.drawDate}
              helperText={errors.drawDate?.message}
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
              <MenuItem value="drawn">Drawn</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </TextField>

            <TextField
              label="Ticket Price"
              type="number"
              {...register('ticketPrice')}
              error={!!errors.ticketPrice}
              helperText={errors.ticketPrice?.message}
            />

            <TextField
              label="Max Tickets Per User"
              type="number"
              {...register('maxTicketsPerUser')}
              error={!!errors.maxTicketsPerUser}
              helperText={errors.maxTicketsPerUser?.message}
            />

            <TextField
              label="Total Ticket Limit"
              type="number"
              {...register('totalTicketLimit')}
              helperText="Leave empty if unlimited"
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