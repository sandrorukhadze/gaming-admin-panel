import { apiClient } from '@/shared/api/client';
import type { LeaderboardPrize } from '../model/leaderboard.types';

export async function getLeaderboardPrizes(): Promise<LeaderboardPrize[]> {
  const response = await apiClient.get<LeaderboardPrize[]>('/leaderboardPrizes');
  return response.data;
}

export async function deleteLeaderboardPrize(id: string): Promise<void> {
  await apiClient.delete(`/leaderboardPrizes/${id}`);
}