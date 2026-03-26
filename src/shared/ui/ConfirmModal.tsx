import { Button, Stack, Typography } from '@mui/material';
import { AppModal } from './AppModal';

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function ConfirmModal({
  open,
  title = 'Are you sure?',
  description = 'You have unsaved changes.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading,
}: ConfirmModalProps) {
  return (
    <AppModal open={open} onClose={onCancel} title={title}>
      <Stack spacing={3}>
        <Typography>{description}</Typography>

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="outlined" onClick={onCancel} disabled={loading}>
            {cancelText}
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={onConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Stack>
      </Stack>
    </AppModal>
  );
}