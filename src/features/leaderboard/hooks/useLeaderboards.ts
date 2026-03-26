import { useQuery } from '@tanstack/react-query';
import { getLeaderboards } from '../api/leaderboard.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { Leaderboard } from '../model/leaderboard.types';

export function useLeaderboards() {
  return useQuery<Leaderboard[]>({
    queryKey: QUERY_KEYS.leaderboards,
    queryFn: getLeaderboards,
  });
}