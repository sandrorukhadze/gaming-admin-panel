import { useState } from 'react';
import { Stack } from '@mui/material';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useDeleteLeaderboardPrize } from '../hooks/useDeleteLeaderboardPrize';
import { LeaderboardPrizeCard } from './LeaderboardPrizeCard';
import type { LeaderboardPrize } from '../model/leaderboard.types';

interface LeaderboardPrizeCardListProps {
  data: LeaderboardPrize[];
}

export function LeaderboardPrizeCardList({
  data,
}: LeaderboardPrizeCardListProps) {
  const [selectedPrize, setSelectedPrize] =
    useState<LeaderboardPrize | null>(null);

  const { mutateAsync, isPending } = useDeleteLeaderboardPrize();

  function handleOpenDelete(prize: LeaderboardPrize) {
    setSelectedPrize(prize);
  }

  function handleCloseDelete() {
    setSelectedPrize(null);
  }

  async function handleConfirmDelete() {
    if (!selectedPrize) return;

    try {
      await mutateAsync(selectedPrize.id);
    } finally {
      handleCloseDelete();
    }
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        useFlexGap
      >
        {data.map((prize) => (
          <Stack key={prize.id} sx={{ width: 300 }}>
            <LeaderboardPrizeCard
              prize={prize}
              onDelete={handleOpenDelete}
            />
          </Stack>
        ))}
      </Stack>

      <ConfirmModal
        open={selectedPrize !== null}
        title="Delete prize"
        description={`Are you sure you want to delete "${selectedPrize?.name ?? ''}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        loading={isPending}
      />
    </>
  );
}