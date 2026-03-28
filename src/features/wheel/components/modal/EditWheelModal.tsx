import { useMemo, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { AppModal } from '@/shared/ui/AppModal';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useUpdateWheel } from '../../hooks/useUpdateWheel';
import type { CreateWheelFormInput, CreateWheelFormValues } from '../../model/wheel.schema';
import type { Wheel } from '../../model/wheel.types';
import { WheelForm } from '../form/WheelForm';

interface EditWheelModalProps {
  open: boolean;
  onClose: () => void;
  wheel: Wheel | null;
}

export function EditWheelModal({
  open,
  onClose,
  wheel,
}: EditWheelModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const { mutateAsync, isPending } = useUpdateWheel();

  const defaultValues: CreateWheelFormInput = useMemo(() => {
    if (!wheel) {
      return {
        name: '',
        description: '',
        status: 'draft',
        segments: [],
        maxSpinsPerUser: 1,
        spinCost: 0,
        backgroundColor: '#ffffff',
        borderColor: '#111827',
      };
    }

    return {
      name: wheel.name,
      description: wheel.description,
      status: wheel.status,
      segments: wheel.segments,
      maxSpinsPerUser: wheel.maxSpinsPerUser,
      spinCost: wheel.spinCost,
      backgroundColor: wheel.backgroundColor,
      borderColor: wheel.borderColor,
    };
  }, [wheel]);

  function handleClose() {
    onClose();
  }

  async function handleSubmit(values: CreateWheelFormValues) {
    if (!wheel) {
      return;
    }

    const payload: Wheel = {
      ...wheel,
      name: values.name,
      description: values.description,
      status: values.status,
      segments: values.segments,
      maxSpinsPerUser: values.maxSpinsPerUser,
      spinCost: values.spinCost,
      backgroundColor: values.backgroundColor,
      borderColor: values.borderColor,
      updatedAt: new Date().toISOString(),
    };

    try {
      await mutateAsync({
        id: wheel.id,
        payload,
      });

      setToast({
        open: true,
        message: 'Wheel updated successfully',
        severity: 'success',
      });

      onClose();
    } catch {
      setToast({
        open: true,
        message: 'Failed to update wheel',
        severity: 'error',
      });
    }
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Edit Wheel">
        <WheelForm
          defaultValues={defaultValues}
          submitLabel="Save"
          onSubmit={handleSubmit}
          onCancel={handleClose}
          isSubmittingExternal={isPending}
        />
      </AppModal>

      <ConfirmModal
        open={isConfirmOpen}
        title="Discard changes?"
        description="You have unsaved changes. Are you sure you want to leave?"
        confirmText="Leave"
        cancelText="Stay"
        onConfirm={onClose}
        onCancel={() => setIsConfirmOpen(false)}
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