import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Leaderboard } from "../../model/leaderboard.types";

type StatusFilter = "all" | Leaderboard["status"];

interface LeaderboardTableToolbarProps {
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  onAdd: () => void;
}

export function LeaderboardTableToolbar({
  statusFilter,
  onStatusChange,
  onAdd,
}: LeaderboardTableToolbarProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(event) =>
            onStatusChange(event.target.value as StatusFilter)
          }
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add
      </Button>
    </Stack>
  );
}
