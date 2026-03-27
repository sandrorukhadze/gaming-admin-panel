import { useMemo, useState } from 'react';
import { Box, Chip, TablePagination, Typography, Stack } from '@mui/material';
import { DataTable, type Column } from '@/shared/ui/DataTable';
import { ConfirmModal } from '@/shared/ui/ConfirmModal';
import type { Raffle } from '../model/raffle.types';
import { RaffleTableToolbar } from './RaffleTableToolbar';
import { RaffleTableActions } from './RaffleTableActions';
import { ViewRaffleModal } from './ViewRaffleModal';
import { useDeleteRaffle } from '../hooks/useDeleteRaffle';

interface RaffleTableProps {
  data: Raffle[];
}

type StatusFilter = 'all' | Raffle['status'];
type Order = 'asc' | 'desc';

function getStatusColor(
  status: Raffle['status']
): 'default' | 'success' | 'warning' | 'error' {
  if (status === 'active') {
    return 'success';
  }

  if (status === 'draft') {
    return 'warning';
  }

  if (status === 'cancelled') {
    return 'error';
  }

  return 'default';
}

function isWithinDateRange(
  raffleDate: string,
  startDateFilter: string,
  endDateFilter: string
): boolean {
  const raffleTime = new Date(raffleDate).getTime();

  if (startDateFilter) {
    const startTime = new Date(startDateFilter).getTime();

    if (raffleTime < startTime) {
      return false;
    }
  }

  if (endDateFilter) {
    const endTime = new Date(endDateFilter).getTime();

    if (raffleTime > endTime) {
      return false;
    }
  }

  return true;
}

export function RaffleTable({ data }: RaffleTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [order, setOrder] = useState<Order>('asc');
  const [page, setPage] = useState<number>(0);
  const [viewId, setViewId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');

  const rowsPerPage = 5;

  const { mutateAsync: deleteRaffle, isPending: isDeletePending } =
    useDeleteRaffle();

  function handleSort(key: string) {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
    setPage(0);
  }

  function handleOpenView(row: Raffle) {
    setViewId(row.id);
  }

  function handleCloseView() {
    setViewId(null);
  }

  function handleOpenDelete(row: Raffle) {
    setDeleteId(row.id);
    setDeleteName(row.name);
  }

  function handleCloseDelete() {
    setDeleteId(null);
    setDeleteName('');
  }

  async function handleConfirmDelete() {
    if (!deleteId) {
      return;
    }

    try {
      await deleteRaffle(deleteId);
    } finally {
      handleCloseDelete();
    }
  }

  const filteredData = useMemo(() => {
    return data.filter((raffle) => {
      const matchesStatus =
        statusFilter === 'all' || raffle.status === statusFilter;

      const matchesDateRange = isWithinDateRange(
        raffle.drawDate,
        startDateFilter,
        endDateFilter
      );

      return matchesStatus && matchesDateRange;
    });
  }, [data, statusFilter, startDateFilter, endDateFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    sorted.sort((a, b) => {
      let result = 0;

      if (orderBy === 'name') {
        result = a.name.localeCompare(b.name);
      }

      if (orderBy === 'ticketPrice') {
        result = a.ticketPrice - b.ticketPrice;
      }

      if (orderBy === 'maxTicketsPerUser') {
        result = a.maxTicketsPerUser - b.maxTicketsPerUser;
      }

      if (orderBy === 'totalTicketLimit') {
        const aValue = a.totalTicketLimit ?? Number.MAX_SAFE_INTEGER;
        const bValue = b.totalTicketLimit ?? Number.MAX_SAFE_INTEGER;
        result = aValue - bValue;
      }

      if (orderBy === 'startDate') {
        result =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }

      if (orderBy === 'endDate') {
        result = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      }

      if (orderBy === 'drawDate') {
        result =
          new Date(a.drawDate).getTime() - new Date(b.drawDate).getTime();
      }

      return order === 'asc' ? result : -result;
    });

    return sorted;
  }, [filteredData, orderBy, order]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, page]);

  const columns: Column<Raffle>[] = [
    {
      key: 'name',
      title: 'Name',
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
      key: 'status',
      title: 'Status',
      render: (row) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status)}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      key: 'ticketPrice',
      title: 'Ticket Price',
      sortable: true,
      render: (row) => row.ticketPrice,
    },
    {
      key: 'maxTicketsPerUser',
      title: 'Max / User',
      sortable: true,
      render: (row) => row.maxTicketsPerUser,
    },
    {
      key: 'totalTicketLimit',
      title: 'Total Limit',
      sortable: true,
      render: (row) => row.totalTicketLimit ?? 'Unlimited',
    },
    {
      key: 'startDate',
      title: 'Start Date',
      sortable: true,
      render: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      key: 'endDate',
      title: 'End Date',
      sortable: true,
      render: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      key: 'drawDate',
      title: 'Draw Date',
      sortable: true,
      render: (row) => new Date(row.drawDate).toLocaleDateString(),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (row) => (
        <RaffleTableActions
          row={row}
          onView={handleOpenView}
          onDelete={handleOpenDelete}
        />
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Raffles
      </Typography>

      <RaffleTableToolbar
        statusFilter={statusFilter}
        startDateFilter={startDateFilter}
        endDateFilter={endDateFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(0);
        }}
        onStartDateChange={(value) => {
          setStartDateFilter(value);
          setPage(0);
        }}
        onEndDateChange={(value) => {
          setEndDateFilter(value);
          setPage(0);
        }}
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

      <ViewRaffleModal
        open={viewId !== null}
        onClose={handleCloseView}
        raffleId={viewId}
      />

      <ConfirmModal
        open={deleteId !== null}
        title="Delete raffle"
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