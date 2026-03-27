import { apiClient } from "@/shared/api/client";
import type { Raffle } from "../model/raffle.types";

export async function getRaffles(): Promise<Raffle[]> {
  const response = await apiClient.get<Raffle[]>("/raffles");
  return response.data;
}

export async function getRaffleById(id: string): Promise<Raffle> {
  const response = await apiClient.get<Raffle>(`/raffles/${id}`);
  return response.data;
}

export async function deleteRaffle(id: string): Promise<void> {
  await apiClient.delete(`/raffles/${id}`);
}

export async function createRaffle(payload: Raffle): Promise<Raffle> {
  const response = await apiClient.post<Raffle>("/raffles", payload);
  return response.data;
}

export async function updateRaffle(
  id: string,
  payload: Raffle,
): Promise<Raffle> {
  const response = await apiClient.put<Raffle>(`/raffles/${id}`, payload);
  return response.data;
}
