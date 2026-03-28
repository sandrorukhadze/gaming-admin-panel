import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { AppModal } from "@/shared/ui/AppModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useCreateWheel } from "../../hooks/useCreateWheel";
import type {
  CreateWheelFormInput,
  CreateWheelFormValues,
} from "../../model/wheel.schema";
import type { Wheel } from "../../model/wheel.types";
import { WheelForm } from "../form/WheelForm";

interface CreateWheelModalProps {
  open: boolean;
  onClose: () => void;
}

function getDefaultValues(): CreateWheelFormInput {
  return {
    name: "",
    description: "",
    status: "draft",
    segments: [
      {
        id: crypto.randomUUID(),
        label: "Coins",
        color: "#f59e0b",
        weight: 50,
        prizeType: "coins",
        prizeAmount: 10,
        imageUrl: "",
      },
      {
        id: crypto.randomUUID(),
        label: "Nothing",
        color: "#94a3b8",
        weight: 50,
        prizeType: "nothing",
        prizeAmount: 0,
        imageUrl: "",
      },
    ],
    maxSpinsPerUser: 1,
    spinCost: 0,
    backgroundColor: "#ffffff",
    borderColor: "#111827",
  };
}

export function CreateWheelModal({ open, onClose }: CreateWheelModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const { mutateAsync, isPending } = useCreateWheel();
  const [currentValues, setCurrentValues] =
    useState<CreateWheelFormInput>(getDefaultValues());
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentValues(getDefaultValues());
      setIsDirty(false);
    }
  }, [open]);

  function handleClose() {
    if (isDirty) {
      setIsConfirmOpen(true);
      return;
    }

    onClose();
  }

  async function handleSubmit(values: CreateWheelFormValues) {
    const now = new Date().toISOString();

    const payload: Wheel = {
      id: crypto.randomUUID(),
      name: values.name,
      description: values.description,
      status: values.status,
      segments: values.segments,
      maxSpinsPerUser: values.maxSpinsPerUser,
      spinCost: values.spinCost,
      backgroundColor: values.backgroundColor,
      borderColor: values.borderColor,
      createdAt: now,
      updatedAt: now,
    };

    try {
      await mutateAsync(payload);

      setToast({
        open: true,
        message: "Wheel created successfully",
        severity: "success",
      });

      setIsDirty(false);
      onClose();
    } catch {
      setToast({
        open: true,
        message: "Failed to create wheel",
        severity: "error",
      });
    }
  }

  return (
    <>
      <AppModal open={open} onClose={handleClose} title="Create Wheel">
        <WheelForm
          defaultValues={currentValues}
          submitLabel="Create"
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
        onConfirm={() => {
          setIsConfirmOpen(false);
          setIsDirty(false);
          onClose();
        }}
        onCancel={() => setIsConfirmOpen(false)}
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
