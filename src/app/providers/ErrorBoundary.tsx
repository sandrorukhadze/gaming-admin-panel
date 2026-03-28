import { Component, type ReactNode } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Global error caught:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
          }}
        >
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h3" fontWeight={800}>
              Something went wrong
            </Typography>

            <Typography color="text.secondary" maxWidth={420}>
              An unexpected error occurred. Please try again or reload the page.
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button variant="outlined" onClick={this.handleReset}>
                Try Again
              </Button>

              <Button variant="contained" onClick={this.handleReload}>
                Reload Page
              </Button>
            </Stack>
          </Stack>
        </Box>
      );
    }

    return this.props.children;
  }
}