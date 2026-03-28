import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Raffle } from '../../model/raffle.types';

type StatusFilter = 'all' | Raffle['status'];

interface RaffleTableToolbarProps {
  statusFilter: StatusFilter;
  startDateFilter: string;
  endDateFilter: string;
  onStatusChange: (value: StatusFilter) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
  onAdd: () => void;
}

export function RaffleTableToolbar({
  statusFilter,
  startDateFilter,
  endDateFilter,
  onStatusChange,
  onStartDateChange,
  onEndDateChange,
  onAdd,
}: RaffleTableToolbarProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      flexWrap="wrap"
      useFlexGap
    >
      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(event) => onStatusChange(event.target.value as StatusFilter)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="drawn">Drawn</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="From"
          type="date"
          value={startDateFilter}
          onChange={(event) => onStartDateChange(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          size="small"
          label="To"
          type="date"
          value={endDateFilter}
          onChange={(event) => onEndDateChange(event.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add Raffle
      </Button>
    </Stack>
  );
}