import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRaffle } from '../api/raffle.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { Raffle } from '../model/raffle.types';

interface UpdateRaffleParams {
  id: string;
  payload: Raffle;
}

export function useUpdateRaffle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdateRaffleParams) =>
      updateRaffle(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.raffles,
      });
    },
  });
}