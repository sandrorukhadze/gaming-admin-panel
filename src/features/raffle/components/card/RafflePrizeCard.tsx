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
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import type { RafflePrize } from '../../model/raffle.types';

interface RafflePrizeCardProps {
  prize: RafflePrize;
  onDelete: (prize: RafflePrize) => void;
}

function getTypeColor(
  type: RafflePrize['type']
): 'warning' | 'info' | 'success' {
  if (type === 'coins') {
    return 'warning';
  }

  if (type === 'freeSpin') {
    return 'info';
  }

  return 'success';
}

function getRankGradient(rank: number): string {
  if (rank === 1) {
    return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
  }

  if (rank === 2) {
    return 'linear-gradient(135deg, #64748b 0%, #cbd5e1 100%)';
  }

  if (rank === 3) {
    return 'linear-gradient(135deg, #b45309 0%, #d97706 100%)';
  }

  return 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
}

export function RafflePrizeCard({
  prize,
  onDelete,
}: RafflePrizeCardProps) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 14px 30px rgba(15, 23, 42, 0.10)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 18px 34px rgba(15, 23, 42, 0.14)',
        },
      }}
    >
      <Box
        sx={{
          background: getRankGradient(prize.rank),
          color: '#fff',
          px: 2,
          py: 1.5,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <EmojiEventsOutlinedIcon fontSize="small" />
            <Typography fontWeight={700}>Rank #{prize.rank}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              label={prize.type}
              size="small"
              color={getTypeColor(prize.type)}
              sx={{
                textTransform: 'capitalize',
                bgcolor: 'rgba(211, 206, 206, 0.92)',
              }}
            />

            <IconButton
              size="small"
              aria-label={`Delete ${prize.name}`}
              onClick={() => onDelete(prize)}
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
        height="190"
        image={prize.imageUrl || 'https://picsum.photos/400/240?grayscale'}
        alt={prize.name}
        onError={(event) => {
          event.currentTarget.src = 'https://picsum.photos/400/240?grayscale';
        }}
        sx={{
          objectFit: 'cover',
          bgcolor: '#f8fafc',
        }}
      />

      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={1.5}>
          <Typography variant="h6" fontWeight={700}>
            {prize.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Reward amount
          </Typography>

          <Typography
            variant="h4"
            fontWeight={800}
            color="primary.main"
            lineHeight={1}
          >
            {prize.amount}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}