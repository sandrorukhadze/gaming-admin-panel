import { apiClient } from '@/shared/api/client';
import type { Raffle } from '../model/raffle.types';

export async function getRaffles(): Promise<Raffle[]> {
  const response = await apiClient.get<Raffle[]>('/raffles');
  return response.data;
}