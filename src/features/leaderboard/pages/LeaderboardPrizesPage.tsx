import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useLeaderboardPrizes } from '../hooks/useLeaderboardPrizes';
import { LeaderboardPrizeCardList } from '../components/LeaderboardPrizeCardList';

export function LeaderboardPrizesPage() {
  const { data, isLoading, isError } = useLeaderboardPrizes();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">Failed to load prizes</Alert>;
  }

  if (data.length === 0) {
    return (
      <Typography textAlign="center" color="text.secondary" mt={6}>
        No information
      </Typography>
    );
  }

  return <LeaderboardPrizeCardList data={data} />;
}