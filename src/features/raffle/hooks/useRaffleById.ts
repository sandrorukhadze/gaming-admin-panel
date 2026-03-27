import { useQuery } from '@tanstack/react-query';
import { getRaffleById } from '../api/raffle.api';
import type { Raffle } from '../model/raffle.types';

export function useRaffleById(id: string | null, open: boolean) {
  return useQuery<Raffle>({
    queryKey: ['raffles', 'detail', id],
    queryFn: () => {
      if (!id) {
        throw new Error('Raffle id is required');
      }

      return getRaffleById(id);
    },
    enabled: open && Boolean(id),
  });
}