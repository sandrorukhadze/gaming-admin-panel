import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLeaderboard } from '../api/leaderboard.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { Leaderboard } from '../model/leaderboard.types';

export function useCreateLeaderboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Leaderboard) => createLeaderboard(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.leaderboards,
      });
    },
  });
}