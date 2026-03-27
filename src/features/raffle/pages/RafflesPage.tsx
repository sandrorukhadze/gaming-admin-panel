import { Alert, Box, CircularProgress, Stack } from '@mui/material';
import { useRaffles } from '../hooks/useRaffles';
import { useRafflePrizes } from '../hooks/useRafflePrizes';
import { RaffleTable } from '../components/RaffleTable';
import { RafflePrizeCardList } from '../components/RafflePrizeCardList';

export function RafflesPage() {
  const {
    data: raffles,
    isLoading: rafflesLoading,
    isError: rafflesError,
  } = useRaffles();

  const {
    data: prizes,
    isLoading: prizesLoading,
    isError: prizesError,
  } = useRafflePrizes();

  if (rafflesLoading || prizesLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (rafflesError || prizesError || !raffles) {
    return <Alert severity="error">Failed to load data</Alert>;
  }

  return (
    <Stack spacing={4}>
      <RaffleTable data={raffles} />

      <RafflePrizeCardList data={prizes ?? []} />
    </Stack>
  );
}