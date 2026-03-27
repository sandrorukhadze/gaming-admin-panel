import { Grid } from '@mui/material';
import { LeaderboardPrizeCard } from './LeaderboardPrizeCard';
import type { LeaderboardPrize } from '../model/leaderboard.types';

interface LeaderboardPrizeCardListProps {
  data: LeaderboardPrize[];
}

export function LeaderboardPrizeCardList({
  data,
}: LeaderboardPrizeCardListProps) {
  return (
    <Grid container spacing={2}>
      {data.map((prize) => (
        <Grid key={prize.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <LeaderboardPrizeCard prize={prize} />
        </Grid>
      ))}
    </Grid>
  );
}