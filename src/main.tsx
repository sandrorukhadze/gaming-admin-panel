import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { QueryProvider } from '@/app/providers/QueryProvider';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { router } from '@/app/router/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </QueryProvider>
    </ErrorBoundary>
  </React.StrictMode>
);