import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLeaderboardPrize } from '../api/leaderboard-prize.api';

export function useDeleteLeaderboardPrize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLeaderboardPrize(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['leaderboard-prizes'],
      });
    },
  });
}