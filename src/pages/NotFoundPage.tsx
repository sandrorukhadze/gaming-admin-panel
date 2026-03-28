import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
      }}
    >
      <Stack spacing={2} alignItems="center" textAlign="center">
        <Typography variant="h2" fontWeight={800} color="primary.main">
          404
        </Typography>

        <Typography variant="h5" fontWeight={700}>
          Page not found
        </Typography>

        <Typography color="text.secondary" maxWidth={420}>
          The page you are looking for does not exist or may have been moved.
        </Typography>

        <Button
          component={RouterLink}
          to="/"
          variant="contained"
        >
          Go Home
        </Button>
      </Stack>
    </Box>
  );
}