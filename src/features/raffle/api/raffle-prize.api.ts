import { apiClient } from "@/shared/api/client";
import type { RafflePrize } from "../model/raffle.types";

export async function getRafflePrizes(): Promise<RafflePrize[]> {
  const response = await apiClient.get<RafflePrize[]>("/rafflePrizes");
  return response.data;
}

export async function deleteRafflePrize(id: string): Promise<void> {
  await apiClient.delete(`/rafflePrizes/${id}`);
}

export async function createRafflePrize(
  payload: RafflePrize,
): Promise<RafflePrize> {
  const response = await apiClient.post<RafflePrize>("/rafflePrizes", payload);
  return response.data;
}
