import { Alert, Box, CircularProgress } from '@mui/material';
import { useRafflePrizes } from '../hooks/useRafflePrizes';
import { RafflePrizeCardList } from '../components/card/RafflePrizeCardList';

export function RafflePrizesPage() {
  const { data, isLoading, isError } = useRafflePrizes();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Failed to load raffle prizes</Alert>;
  }

  return <RafflePrizeCardList data={data ?? []} />;
}