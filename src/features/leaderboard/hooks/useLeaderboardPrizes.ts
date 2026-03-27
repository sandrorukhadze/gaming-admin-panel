import { useQuery } from '@tanstack/react-query';
import { getLeaderboardPrizes } from '../api/leaderboard-prize.api';
import type { LeaderboardPrize } from '../model/leaderboard.types';

export function useLeaderboardPrizes() {
  return useQuery<LeaderboardPrize  []>({
    queryKey: ['leaderboard-prizes'],
    queryFn: getLeaderboardPrizes,
  });
}