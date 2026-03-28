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
import { useLeaderboardById } from '../../hooks/useLeaderboardById';

interface ViewLeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  leaderboardId: number | null;
}

function getStatusColor(status: 'draft' | 'active' | 'completed') {
  if (status === 'active') {
    return 'success';
  }

  if (status === 'draft') {
    return 'warning';
  }

  return 'default';
}

function getScoringColor(scoringType: 'points' | 'wins' | 'wagered') {
  if (scoringType === 'points') {
    return 'primary';
  }

  if (scoringType === 'wins') {
    return 'secondary';
  }

  return 'info';
}

export function ViewLeaderboardModal({
  open,
  onClose,
  leaderboardId,
}: ViewLeaderboardModalProps) {
  const { data, isLoading, isError } = useLeaderboardById(leaderboardId, open);

  return (
    <AppModal open={open} onClose={onClose} title="Leaderboard Details">
      {isLoading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : null}

      {isError ? (
        <Alert severity="error">Failed to load leaderboard</Alert>
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
              Title
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {data.title}
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

          <Stack direction="row" spacing={2}>
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

            <Box>
              <Typography variant="caption" color="text.secondary">
                Scoring Type
              </Typography>
              <Box mt={0.5}>
                <Chip
                  label={data.scoringType}
                  color={getScoringColor(data.scoringType)}
                  size="small"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Start Date
              </Typography>
              <Typography variant="body1">
                {new Date(data.startDate).toLocaleString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary">
                End Date
              </Typography>
              <Typography variant="body1">
                {new Date(data.endDate).toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          <Box>
            <Typography variant="caption" color="text.secondary">
              Max Participants
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              {data.maxParticipants}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
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