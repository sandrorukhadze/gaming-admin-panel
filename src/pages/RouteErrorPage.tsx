import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function RouteErrorPage() {
  const error = useRouteError();

  let message = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  }

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
        <Typography variant="h3" fontWeight={800}>
          Oops 😬
        </Typography>

        <Typography>{message}</Typography>

        <Button component={RouterLink} to="/" variant="contained">
          Go Home
        </Button>
      </Stack>
    </Box>
  );
}