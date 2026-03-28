import { IconButton, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { Wheel } from '../model/wheel.types';

interface WheelTableActionsProps {
  row: Wheel;
  onView: (row: Wheel) => void;
  onEdit: (row: Wheel) => void;
  onDelete: (row: Wheel) => void;
}

export function WheelTableActions({
  row,
  onView,
  onEdit,
  onDelete,
}: WheelTableActionsProps) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        size="small"
        color="primary"
        aria-label={`View ${row.name}`}
        onClick={() => onView(row)}
      >
        <VisibilityOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        color="secondary"
        aria-label={`Edit ${row.name}`}
        onClick={() => onEdit(row)}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        color="error"
        aria-label={`Delete ${row.name}`}
        onClick={() => onDelete(row)}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}