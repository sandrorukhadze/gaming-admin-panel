import { useMemo, useState } from "react";
import { Chip, TablePagination, Typography, Stack } from "@mui/material";
import type { Leaderboard } from "../../model/leaderboard.types";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { CreateLeaderboardModal } from "../modal/CreateLeaderboardModal";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { useDeleteLeaderboard } from "../../hooks/useDeleteLeaderboard";
import { EditLeaderboardModal } from "../modal/EditLeaderboardModal";
import { ViewLeaderboardModal } from "../modal/ViewLeaderboardModal";
import { LeaderboardTableActions } from "./LeaderboardTableActions";
import { LeaderboardTableToolbar } from "./LeaderboardTableToolbar";

interface LeaderboardTableProps {
  data: Leaderboard[];
}

type StatusFilter = "all" | Leaderboard["status"];
type Order = "asc" | "desc";

function getStatusColor(
  status: Leaderboard["status"],
): "default" | "success" | "warning" {
  if (status === "active") {
    return "success";
  }

  if (status === "draft") {
    return "warning";
  }

  return "default";
}

function getScoringColor(
  scoringType: Leaderboard["scoringType"],
): "primary" | "secondary" | "info" {
  if (scoringType === "points") {
    return "primary";
  }

  if (scoringType === "wins") {
    return "secondary";
  }

  return "info";
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [orderBy, setOrderBy] = useState<string>("title");
  const [order, setOrder] = useState<Order>("asc");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [editItem, setEditItem] = useState<Leaderboard | null>(null);
  const [viewId, setViewId] = useState<number | null>(null);

  const rowsPerPage = 3;

  const { mutateAsync: deleteLeaderboard, isPending: isDeletePending } =
    useDeleteLeaderboard();

  function handleSort(key: string) {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
    setPage(0);
  }

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function handleOpenDelete(row: Leaderboard) {
    setDeleteId(row.id);
    setDeleteTitle(row.title);
  }

  function handleCloseDelete() {
    setDeleteId(null);
    setDeleteTitle("");
  }

  function handleOpenView(row: Leaderboard) {
    setViewId(row.id);
  }

  function handleCloseView() {
    setViewId(null);
  }

  async function handleConfirmDelete() {
    if (deleteId === null) {
      return;
    }

    try {
      await deleteLeaderboard(deleteId);
    } finally {
      handleCloseDelete();
    }
  }

  function handleOpenEdit(row: Leaderboard) {
    setEditItem(row);
  }

  function handleCloseEdit() {
    setEditItem(null);
  }

  const filteredData = useMemo(() => {
    if (statusFilter === "all") {
      return data;
    }

    return data.filter((item) => item.status === statusFilter);
  }, [data, statusFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    sorted.sort((a, b) => {
      let result = 0;

      if (orderBy === "title") {
        result = a.title.localeCompare(b.title);
      }

      if (orderBy === "scoringType") {
        result = a.scoringType.localeCompare(b.scoringType);
      }

      if (orderBy === "startDate") {
        result =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }

      if (orderBy === "endDate") {
        result = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      }

      if (orderBy === "maxParticipants") {
        result = a.maxParticipants - b.maxParticipants;
      }

      return order === "asc" ? result : -result;
    });

    return sorted;
  }, [filteredData, orderBy, order]);

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page]);

  const columns: Column<Leaderboard>[] = [
    {
      key: "title",
      title: "Title",
      sortable: true,
      render: (row) => (
        <Stack spacing={0.5}>
          <Typography fontWeight={600}>{row.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {row.description}
          </Typography>
        </Stack>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      key: "scoringType",
      title: "Scoring",
      sortable: true,
      render: (row) => (
        <Chip
          label={row.scoringType}
          color={getScoringColor(row.scoringType)}
          size="small"
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      key: "startDate",
      title: "Start Date",
      sortable: true,
      render: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      key: "endDate",
      title: "End Date",
      sortable: true,
      render: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      key: "maxParticipants",
      title: "Participants",
      sortable: true,
      render: (row) => row.maxParticipants,
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <LeaderboardTableActions
          row={row}
          onDelete={handleOpenDelete}
          onEdit={handleOpenEdit}
          onView={handleOpenView}
        />
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Leaderboards
      </Typography>

      <LeaderboardTableToolbar
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(0);
        }}
        onAdd={handleOpenCreateModal}
      />

      {sortedData.length === 0 ? (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          mt={4}
        >
          No information
        </Typography>
      ) : (
        <>
          <DataTable
            data={paginatedData}
            columns={columns}
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
          />

          <TablePagination
            component="div"
            count={sortedData.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5]}
          />
        </>
      )}

      <CreateLeaderboardModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        existingLeaderboards={data}
      />

      <EditLeaderboardModal
        open={editItem !== null}
        onClose={handleCloseEdit}
        leaderboard={editItem}
      />

      <ViewLeaderboardModal
        open={viewId !== null}
        onClose={handleCloseView}
        leaderboardId={viewId}
      />

      <ConfirmModal
        open={deleteId !== null}
        title="Delete leaderboard"
        description={`Are you sure you want to delete "${deleteTitle}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        loading={isDeletePending}
      />
    </>
  );
}
