import { Alert, Box, CircularProgress } from '@mui/material';
import { useLeaderboardPrizes } from '../hooks/useLeaderboardPrizes';
import { LeaderboardPrizeCardList } from '../components/card/LeaderboardPrizeCardList';

export function LeaderboardPrizesPage() {
  const { data, isLoading, isError } = useLeaderboardPrizes();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <Alert severity="error">Failed to load prizes</Alert>;
  }

  return <LeaderboardPrizeCardList data={data ?? []} />;
}

