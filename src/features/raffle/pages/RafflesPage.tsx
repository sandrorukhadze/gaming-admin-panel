import { Alert, Box, CircularProgress } from '@mui/material';
import { useRaffles } from '../hooks/useRaffles';
import { RaffleTable } from '../components/RaffleTable';

export function RafflesPage() {
  const { data, isLoading, isError } = useRaffles();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">Failed to load raffles</Alert>;
  }

  return <RaffleTable data={data} />;
}