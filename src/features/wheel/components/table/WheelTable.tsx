import { useMemo, useState } from "react";
import { Box, Chip, TablePagination, Typography, Stack } from "@mui/material";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { WheelTableToolbar } from "./WheelTableToolbar";
import { WheelTableActions } from "./WheelTableActions";
import type { Wheel } from "../../model/wheel.types";
import { CreateWheelModal } from "../modal/CreateWheelModal";
import { EditWheelModal } from "../modal/EditWheelModal";
import { ViewWheelModal } from "../modal/ViewWheelModal";
import { useDeleteWheel } from "../../hooks/useDeleteWheel";

interface WheelTableProps {
  data: Wheel[];
}

type StatusFilter = "all" | Wheel["status"];
type Order = "asc" | "desc";

function getStatusColor(
  status: Wheel["status"],
): "default" | "success" | "warning" {
  if (status === "active") {
    return "success";
  }

  if (status === "draft") {
    return "warning";
  }

  return "default";
}

export function WheelTable({ data }: WheelTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState<number>(0);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editItem, setEditItem] = useState<Wheel | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const rowsPerPage = 5;

  const { mutateAsync: deleteWheel, isPending: isDeletePending } =
    useDeleteWheel();

  function handleSort(key: string) {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
    setPage(0);
  }

  function handleOpenView(row: Wheel) {
    setViewId(row.id);
  }

  function handleCloseView() {
    setViewId(null);
  }

  function handleOpenEdit(row: Wheel) {
    setEditItem(row);
  }

  function handleCloseEdit() {
    setEditItem(null);
  }

  function handleOpenDelete(row: Wheel) {
    setDeleteId(row.id);
    setDeleteName(row.name);
  }

  function handleCloseDelete() {
    setDeleteId(null);
    setDeleteName("");
  }

  async function handleConfirmDelete() {
    if (!deleteId) {
      return;
    }

    try {
      await deleteWheel(deleteId);
    } finally {
      handleCloseDelete();
    }
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

      if (orderBy === "name") {
        result = a.name.localeCompare(b.name);
      }

      if (orderBy === "spinCost") {
        result = a.spinCost - b.spinCost;
      }

      if (orderBy === "maxSpinsPerUser") {
        result = a.maxSpinsPerUser - b.maxSpinsPerUser;
      }

      if (orderBy === "createdAt") {
        result =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }

      if (orderBy === "segments") {
        result = a.segments.length - b.segments.length;
      }

      return order === "asc" ? result : -result;
    });

    return sorted;
  }, [filteredData, orderBy, order]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, page]);

  const columns: Column<Wheel>[] = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      render: (row) => (
        <Stack spacing={0.5}>
          <Typography fontWeight={600}>{row.name}</Typography>
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
      key: "segments",
      title: "Segments",
      sortable: true,
      render: (row) => row.segments.length,
    },
    {
      key: "maxSpinsPerUser",
      title: "Max Spins/User",
      sortable: true,
      render: (row) => row.maxSpinsPerUser,
    },
    {
      key: "spinCost",
      title: "Spin Cost",
      sortable: true,
      render: (row) => row.spinCost,
    },
    {
      key: "createdAt",
      title: "Created At",
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <WheelTableActions
          row={row}
          onView={handleOpenView}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
        />
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Wheels
      </Typography>

      <WheelTableToolbar
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(0);
        }}
        onAdd={() => setIsCreateOpen(true)}
      />

      {sortedData.length === 0 ? (
        <Typography color="text.secondary">No information</Typography>
      ) : (
        <>
          <DataTable
            data={paginatedData}
            columns={columns}
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
          />

          <Box mt={1}>
            <TablePagination
              component="div"
              count={sortedData.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </>
      )}

      <CreateWheelModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <EditWheelModal
        open={editItem !== null}
        onClose={handleCloseEdit}
        wheel={editItem}
      />

      <ViewWheelModal
        open={viewId !== null}
        onClose={handleCloseView}
        wheelId={viewId}
      />

      <ConfirmModal
        open={deleteId !== null}
        title="Delete wheel"
        description={`Are you sure you want to delete "${deleteName}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete}
        loading={isDeletePending}
      />
    </>
  );
}
