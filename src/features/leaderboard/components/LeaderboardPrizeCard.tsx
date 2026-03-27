import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { LeaderboardPrize } from '../model/leaderboard.types';

interface LeaderboardPrizeCardProps {
  prize: LeaderboardPrize;
  onDelete: (prize: LeaderboardPrize) => void;
}

function getTypeColor(
  type: LeaderboardPrize['type']
): 'warning' | 'info' | 'success' {
  if (type === 'coins') {
    return 'warning';
  }

  if (type === 'freeSpin') {
    return 'info';
  }

  return 'success';
}

function getRankBackground(rank: number): string {
  if (rank === 1) {
    return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
  }

  if (rank === 2) {
    return 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)';
  }

  if (rank === 3) {
    return 'linear-gradient(135deg, #b45309 0%, #d97706 100%)';
  }

  return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
}

export function LeaderboardPrizeCard({
  prize,
  onDelete,
}: LeaderboardPrizeCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <Box
        sx={{
          background: getRankBackground(prize.rank),
          color: '#fff',
          px: 2,
          py: 1.5,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>
            Rank #{prize.rank}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={prize.type}
              size="small"
              color={getTypeColor(prize.type)}
              sx={{ textTransform: 'capitalize', bgcolor: 'rgba(178, 176, 176, 0.9)' }}
            />

            <IconButton
              size="small"
              onClick={() => onDelete(prize)}
              aria-label={`Delete ${prize.name}`}
              sx={{
                color: '#fff',
                bgcolor: 'rgba(255,255,255,0.18)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.28)',
                },
              }}
            >
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <CardMedia
        component="img"
        height="180"
        image={prize.imageUrl || 'https://picsum.photos/400/250?grayscale'}
        alt={prize.name}
        onError={(event) => {
          event.currentTarget.src = 'https://picsum.photos/400/250?grayscale';
        }}
        sx={{ objectFit: 'cover', bgcolor: '#f8fafc' }}
      />

      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6" fontWeight={700}>
            {prize.name}
          </Typography>

          <Typography color="text.secondary">Reward amount</Typography>

          <Typography variant="h5" fontWeight={800} color="primary.main">
            {prize.amount}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}