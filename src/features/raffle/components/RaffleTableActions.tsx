import { IconButton, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { Raffle } from '../model/raffle.types';

interface RaffleTableActionsProps {
  row: Raffle;
  onView: (row: Raffle) => void;
  onEdit: (row: Raffle) => void;
  onDelete: (row: Raffle) => void;
}

export function RaffleTableActions({
  row,
  onView,
  onEdit,
  onDelete,
}: RaffleTableActionsProps) {
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

      {row.status !== 'drawn' ? (
        <IconButton
          size="small"
          color="secondary"
          aria-label={`Edit ${row.name}`}
          onClick={() => onEdit(row)}
        >
          <EditOutlinedIcon fontSize="small" />
        </IconButton>
      ) : null}

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