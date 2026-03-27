import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLeaderboardPrize } from '../api/leaderboard-prize.api';

export function useCreateLeaderboardPrize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLeaderboardPrize,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['leaderboard-prizes'],
      });
    },
  });
}