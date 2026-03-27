import { apiClient } from '@/shared/api/client';
import type { Raffle } from '../model/raffle.types';

export async function getRaffles(): Promise<Raffle[]> {
  const response = await apiClient.get<Raffle[]>('/raffles');
  return response.data;
}

export async function getRaffleById(id: string): Promise<Raffle> {
  const response = await apiClient.get<Raffle>(`/raffles/${id}`);
  return response.data;
}

export async function deleteRaffle(id: string): Promise<void> {
  await apiClient.delete(`/raffles/${id}`);
}