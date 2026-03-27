import { useQuery } from '@tanstack/react-query';
import { getLeaderboardById } from '../api/leaderboard.api';
import type { Leaderboard } from '../model/leaderboard.types';

export function useLeaderboardById(id: number | null, open: boolean) {
  return useQuery<Leaderboard>({
    queryKey: ['leaderboards', 'detail', id],
    queryFn: () => {
      if (id === null) {
        throw new Error('Leaderboard id is required');
      }

      return getLeaderboardById(id);
    },
    enabled: open && id !== null,
  });
}