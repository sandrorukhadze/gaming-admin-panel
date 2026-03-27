import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRaffle } from '../api/raffle.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';

export function useDeleteRaffle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRaffle(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.raffles,
      });
    },
  });
}