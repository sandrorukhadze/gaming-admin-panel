import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRafflePrize } from '../api/raffle-prize.api';

export function useDeleteRafflePrize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRafflePrize(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['raffle-prizes'],
      });
    },
  });
}