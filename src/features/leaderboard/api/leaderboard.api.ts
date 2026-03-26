import { apiClient } from "@/shared/api/client";
import type { Leaderboard } from "../model/leaderboard.types";

export async function getLeaderboards(): Promise<Leaderboard[]> {
  const response = await apiClient.get<Leaderboard[]>("/leaderboards");
  return response.data;
}

export async function createLeaderboard(
  payload: Omit<Leaderboard, 'id'>
): Promise<Leaderboard> {
  const response = await apiClient.post<Leaderboard>(
    '/leaderboards',
    payload
  );
  return response.data;
}

export async function deleteLeaderboard(id: number) {
  await apiClient.delete(`/leaderboards/${id}`);
}
