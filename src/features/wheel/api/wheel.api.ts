import { apiClient } from '@/shared/api/client';
import type { Wheel } from '../model/wheel.types';

export async function getWheels(): Promise<Wheel[]> {
  const response = await apiClient.get<Wheel[]>('/wheels');
  return response.data;
}

export async function getWheelById(id: string): Promise<Wheel> {
  const response = await apiClient.get<Wheel>(`/wheels/${id}`);
  return response.data;
}

export async function createWheel(payload: Wheel): Promise<Wheel> {
  const response = await apiClient.post<Wheel>('/wheels', payload);
  return response.data;
}

export async function updateWheel(id: string, payload: Wheel): Promise<Wheel> {
  const response = await apiClient.put<Wheel>(`/wheels/${id}`, payload);
  return response.data;
}

export async function deleteWheel(id: string): Promise<void> {
  await apiClient.delete(`/wheels/${id}`);
}