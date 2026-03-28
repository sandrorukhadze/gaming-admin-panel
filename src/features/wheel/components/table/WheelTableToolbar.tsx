import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { Wheel } from '../model/wheel.types';

type StatusFilter = 'all' | Wheel['status'];

interface WheelTableToolbarProps {
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  onAdd: () => void;
}

export function WheelTableToolbar({
  statusFilter,
  onStatusChange,
  onAdd,
}: WheelTableToolbarProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      flexWrap="wrap"
      useFlexGap
    >
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
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" startIcon={<AddIcon />} onClick={onAdd}>
        Add Wheel
      </Button>
    </Stack>
  );
}