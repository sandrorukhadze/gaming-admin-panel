import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { AppModal } from '@/shared/ui/AppModal';
import { useRaffleById } from '../hooks/useRaffleById';
import type { Raffle } from '../model/raffle.types';

interface ViewRaffleModalProps {
  open: boolean;
  onClose: () => void;
  raffleId: string | null;
}

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

export function ViewRaffleModal({
  open,
  onClose,
  raffleId,
}: ViewRaffleModalProps) {
  const { data, isLoading, isError } = useRaffleById(raffleId, open);

  return (
    <AppModal open={open} onClose={onClose} title="Raffle Details">
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : null}

      {isError ? (
        <Alert severity="error">Failed to load raffle</Alert>
      ) : null}

      {!isLoading && !isError && data ? (
        <Stack spacing={2}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              ID
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {data.id}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="caption" color="text.secondary">
              Name
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {data.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Description
            </Typography>
            <Typography variant="body1">
              {data.description}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Status
            </Typography>
            <Box mt={0.5}>
              <Chip
                label={data.status}
                color={getStatusColor(data.status)}
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
            </Box>
          </Box>

          <Stack direction="row" spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Ticket Price
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.ticketPrice}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Max Tickets Per User
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.maxTicketsPerUser}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Total Ticket Limit
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {data.totalTicketLimit ?? 'Unlimited'}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Start Date
              </Typography>
              <Typography variant="body2">
                {new Date(data.startDate).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                End Date
              </Typography>
              <Typography variant="body2">
                {new Date(data.endDate).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Draw Date
              </Typography>
              <Typography variant="body2">
                {new Date(data.drawDate).toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={3}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body2">
                {new Date(data.createdAt).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                Updated At
              </Typography>
              <Typography variant="body2">
                {new Date(data.updatedAt).toLocaleString()}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ) : null}
    </AppModal>
  );
}