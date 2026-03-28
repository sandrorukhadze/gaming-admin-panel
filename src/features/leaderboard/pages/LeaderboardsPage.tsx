import { Alert, Box, CircularProgress, Stack } from "@mui/material";
import { useLeaderboards } from "../hooks/useLeaderboards";
import { useLeaderboardPrizes } from "../hooks/useLeaderboardPrizes";
import { LeaderboardTable } from "../components/table/LeaderboardTable";
import { LeaderboardPrizeCardList } from "../components/card/LeaderboardPrizeCardList";

export function LeaderboardsPage() {
  const {
    data: leaderboards,
    isLoading: isLeaderboardsLoading,
    isError: isLeaderboardsError,
  } = useLeaderboards();

  const {
    data: prizes,
    isLoading: isPrizesLoading,
    isError: isPrizesError,
  } = useLeaderboardPrizes();

  if (isLeaderboardsLoading || isPrizesLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isLeaderboardsError || !leaderboards) {
    return <Alert severity="error">Failed to load leaderboards</Alert>;
  }

  if (isPrizesError || !prizes) {
    return <Alert severity="error">Failed to load prizes</Alert>;
  }

  return (
    <Stack spacing={4}>
      {/* Leaderboards Table */}
      <LeaderboardTable data={leaderboards} />

      {/* Prize Cards */}
      <Box>
        {/* <Typography variant="h5" fontWeight={700} mb={2}>
          Leaderboard Prizes
        </Typography> */}

        <Box>
          <LeaderboardPrizeCardList data={prizes ?? []} />
        </Box>
      </Box>
    </Stack>
  );
}
