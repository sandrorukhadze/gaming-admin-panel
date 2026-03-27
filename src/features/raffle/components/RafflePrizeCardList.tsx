import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import { RafflePrizeCard } from './RafflePrizeCard';
import { useDeleteRafflePrize } from '../hooks/useDeleteRafflePrize';
import type { RafflePrize } from '../model/raffle.types';

interface RafflePrizeCardListProps {
  data: RafflePrize[];
}

export function RafflePrizeCardList({ data }: RafflePrizeCardListProps) {
  const [selectedPrize, setSelectedPrize] = useState<RafflePrize | null>(null);

  const { mutateAsync, isPending } = useDeleteRafflePrize();

  function handleOpenDelete(prize: RafflePrize) {
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
      <Typography variant="h5" fontWeight={700} mb={2}>
        Raffle Prizes
      </Typography>

      {data.length === 0 ? (
        <Typography color="text.secondary">No information</Typography>
      ) : (
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {data.map((prize) => (
            <Stack
              key={prize.id}
              sx={{
                width: 'calc((100% - 32px) / 3)',
              }}
            >
              <RafflePrizeCard
                prize={prize}
                onDelete={handleOpenDelete}
              />
            </Stack>
          ))}
        </Stack>
      )}

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