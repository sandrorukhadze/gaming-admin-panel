import { Paper, Typography } from '@mui/material';

export function WheelPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={1}>
        Wheel
      </Typography>

      <Typography color="text.secondary">
        Wheel management page
      </Typography>
    </Paper>
  );
}