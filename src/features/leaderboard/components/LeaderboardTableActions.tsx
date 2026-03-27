import { IconButton, Stack } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { Leaderboard } from '../model/leaderboard.types';

interface LeaderboardTableActionsProps {
  row: Leaderboard;
  onDelete: (row: Leaderboard) => void;
  onEdit: (row: Leaderboard) => void;
}

export function LeaderboardTableActions({
  row,
  onDelete,
  onEdit,
}: LeaderboardTableActionsProps) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        size="small"
        color="primary"
        aria-label={`View ${row.title}`}
      >
        <VisibilityOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        color="secondary"
        aria-label={`Edit ${row.title}`}
        onClick={() => onEdit(row)}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>

      <IconButton
        size="small"
        color="error"
        aria-label={`Delete ${row.title}`}
        onClick={() => onDelete(row)}
      >
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}