import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRafflePrize } from '../api/raffle-prize.api';

export function useCreateRafflePrize() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRafflePrize,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['raffle-prizes'],
      });
    },
  });
}