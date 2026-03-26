import { apiClient } from '@/shared/api/client';
import type { Leaderboard } from '../model/leaderboard.types';

export async function getLeaderboards(): Promise<Leaderboard[]> {
  const response = await apiClient.get<Leaderboard[]>('/leaderboards');
  return response.data;
}