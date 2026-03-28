import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useDeleteRafflePrize } from "../../hooks/useDeleteRafflePrize";
import { RafflePrizeCard } from "./RafflePrizeCard";
import { CreateRafflePrizeModal } from "../modal/CreateRafflePrizeModal";
import type { RafflePrize } from "../../model/raffle.types";

interface RafflePrizeCardListProps {
  data: RafflePrize[];
}

export function RafflePrizeCardList({ data }: RafflePrizeCardListProps) {
  const [selectedPrize, setSelectedPrize] = useState<RafflePrize | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" fontWeight={700}>
          Raffle Prizes
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setIsCreateOpen(true)}
        >
          Add Prize
        </Button>
      </Stack>

      {data.length === 0 ? (
        <Typography color="text.secondary">No information</Typography>
      ) : (
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          {data.map((prize) => (
            <Stack
              key={prize.id}
              sx={{
                width: "calc((100% - 32px) / 3)",
              }}
            >
              <RafflePrizeCard prize={prize} onDelete={handleOpenDelete} />
            </Stack>
          ))}
        </Stack>
      )}

      <CreateRafflePrizeModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        existingPrizes={data}
      />

      <ConfirmModal
        open={selectedPrize !== null}
        title="Delete prize"
        description={`Are you sure you want to delete "${selectedPrize?.name ?? ""}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        loading={isPending}
      />
    </>
  );
}
