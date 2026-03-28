import { Alert, Box, CircularProgress } from "@mui/material";
import { AppModal } from "@/shared/ui/AppModal";
import { useWheelById } from "../../hooks/useWheelById";
import { WheelDetailView } from "../form/WheelDetailView";

interface ViewWheelModalProps {
  open: boolean;
  onClose: () => void;
  wheelId: string | null;
}

export function ViewWheelModal({
  open,
  onClose,
  wheelId,
}: ViewWheelModalProps) {
  const { data, isLoading, isError } = useWheelById(wheelId, open);

  return (
    <AppModal open={open} onClose={onClose} title="Wheel Details">
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : null}

      {isError ? <Alert severity="error">Failed to load wheel</Alert> : null}

      {!isLoading && !isError && data ? <WheelDetailView wheel={data} /> : null}
    </AppModal>
  );
}
