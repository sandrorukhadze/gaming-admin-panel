import { Chip, Stack, Typography } from '@mui/material';
import type { Leaderboard } from '../model/leaderboard.types';
import { DataTable, type Column } from '@/shared/ui/DataTable';

interface LeaderboardTableProps {
  data: Leaderboard[];
}

function getStatusColor(status: Leaderboard['status']): 'default' | 'success' | 'warning' {
  if (status === 'active') {
    return 'success';
  }

  if (status === 'draft') {
    return 'warning';
  }

  return 'default';
}

function getScoringColor(
  scoringType: Leaderboard['scoringType']
): 'primary' | 'secondary' | 'info' {
  if (scoringType === 'points') {
    return 'primary';
  }

  if (scoringType === 'wins') {
    return 'secondary';
  }

  return 'info';
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const columns: Column<Leaderboard>[] = [
    {
      key: 'title',
      title: 'Title',
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
      key: 'status',
      title: 'Status',
      render: (row) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status)}
          size="small"
          variant="filled"
          sx={{ textTransform: 'capitalize', fontWeight: 600 }}
        />
      ),
    },
    {
      key: 'scoringType',
      title: 'Scoring',
      render: (row) => (
        <Chip
          label={row.scoringType}
          color={getScoringColor(row.scoringType)}
          size="small"
          variant="outlined"
          sx={{ textTransform: 'capitalize', fontWeight: 500 }}
        />
      ),
    },
    {
      key: 'prizes',
      title: 'Prizes',
      render: (row) => (
        <Typography fontWeight={600} color="warning.main">
          {row.prizes.length} prizes
        </Typography>
      ),
    },
    {
      key: 'startDate',
      title: 'Start Date',
      render: (row) => (
        <Typography color="text.secondary">
          {new Date(row.startDate).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      key: 'endDate',
      title: 'End Date',
      render: (row) => (
        <Typography color="text.secondary">
          {new Date(row.endDate).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      key: 'maxParticipants',
      title: 'Participants',
      render: (row) => (
        <Typography fontWeight={600} color="primary.main">
          {row.maxParticipants}
        </Typography>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Leaderboards
      </Typography>

      <DataTable data={data} columns={columns} />
    </>
  );
}