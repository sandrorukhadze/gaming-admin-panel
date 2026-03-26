import { Alert, Box, CircularProgress } from '@mui/material';
import { useLeaderboards } from '../hooks/useLeaderboards';
import { LeaderboardTable } from '../components/LeaderboardTable';

export function LeaderboardsPage() {
  const { data, isLoading, isError } = useLeaderboards();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">Failed to load leaderboards</Alert>;
  }

  return <LeaderboardTable data={data} />;
}