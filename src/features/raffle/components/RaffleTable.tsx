import { useMemo, useState } from 'react';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { DataTable, type Column } from '@/shared/ui/DataTable';
import type { Raffle } from '../model/raffle.types';

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

  const rowsPerPage = 5;

  function handleSort(key: string) {
    const isAsc = orderBy === key && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(key);
    setPage(0);
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
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Raffles
      </Typography>

      <Stack direction="row" spacing={2} mb={2} flexWrap="wrap" useFlexGap>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(event) => {
              setStatusFilter(event.target.value as StatusFilter);
              setPage(0);
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="drawn">Drawn</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="From"
          type="date"
          value={startDateFilter}
          onChange={(event) => {
            setStartDateFilter(event.target.value);
            setPage(0);
          }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          size="small"
          label="To"
          type="date"
          value={endDateFilter}
          onChange={(event) => {
            setEndDateFilter(event.target.value);
            setPage(0);
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

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
    </>
  );
}