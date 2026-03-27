import { useQuery } from '@tanstack/react-query';
import { getRafflePrizes } from '../api/raffle-prize.api';
import type { RafflePrize } from '../model/raffle.types';

export function useRafflePrizes() {
  return useQuery<RafflePrize[]>({
    queryKey: ['raffle-prizes'],
    queryFn: getRafflePrizes,
  });
}