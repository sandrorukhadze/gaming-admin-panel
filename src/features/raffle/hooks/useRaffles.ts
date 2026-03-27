import { useQuery } from '@tanstack/react-query';
import { getRaffles } from '../api/raffle.api';
import { QUERY_KEYS } from '@/shared/constants/query-keys';
import type { Raffle } from '../model/raffle.types';

export function useRaffles() {
  return useQuery<Raffle[]>({
    queryKey: QUERY_KEYS.raffles,
    queryFn: getRaffles,
  });
}