import { Paper, Typography } from '@mui/material';

export function RafflesPage() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={1}>
        Raffles
      </Typography>

      <Typography color="text.secondary">
        Raffle management page
      </Typography>
    </Paper>
  );
}