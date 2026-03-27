import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRaffle } from '../api/raffle.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { Raffle } from '../model/raffle.types';

export function useCreateRaffle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Raffle) => createRaffle(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.raffles,
      });
    },
  });
}