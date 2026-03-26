import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLeaderboard } from '../api/leaderboard.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

export function useDeleteLeaderboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteLeaderboard(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.leaderboards,
      });
    },
  });
}