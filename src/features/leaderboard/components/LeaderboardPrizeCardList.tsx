import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { useDeleteLeaderboardPrize } from '../hooks/useDeleteLeaderboardPrize';
import { LeaderboardPrizeCard } from './LeaderboardPrizeCard';
import { CreatePrizeModal } from './CreatePrizeModal';
import type { LeaderboardPrize } from '../model/leaderboard.types';

interface LeaderboardPrizeCardListProps {
  data: LeaderboardPrize[];
}

export function LeaderboardPrizeCardList({
  data,
}: LeaderboardPrizeCardListProps) {
  const [selectedPrize, setSelectedPrize] = useState<LeaderboardPrize | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { mutateAsync, isPending } = useDeleteLeaderboardPrize();

  function handleOpenDelete(prize: LeaderboardPrize) {
    setSelectedPrize(prize);
  }

  function handleCloseDelete() {
    setSelectedPrize(null);
  }

  async function handleConfirmDelete() {
    if (!selectedPrize) {
      return;
    }

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
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={700}>
          Leaderboard Prizes
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateOpen(true)}
        >
          Add Prize
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        {data.map((prize) => (
          <Stack
            key={prize.id}
            sx={{
              width: 'calc((100% - 32px) / 3)',
            }}
          >
            <LeaderboardPrizeCard
              prize={prize}
              onDelete={handleOpenDelete}
            />
          </Stack>
        ))}
      </Stack>

      <CreatePrizeModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        existingPrizes={data}
      />

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