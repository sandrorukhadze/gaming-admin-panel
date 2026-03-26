import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AppBreadcrumbs } from '@/app/layout/AppBreadcrumbs';
import { ROUTES } from '@/shared/constants/routes';

interface AppTopbarProps {
  sidebarWidth: number;
}

function getPageTitle(pathname: string): string {
  if (pathname.startsWith(ROUTES.raffles)) {
    return 'Raffles';
  }

  if (pathname.startsWith(ROUTES.wheel)) {
    return 'Wheel';
  }

  return 'Leaderboards';
}

export function AppTopbar({ sidebarWidth }: AppTopbarProps) {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: `calc(100% - ${sidebarWidth}px)`,
        ml: `${sidebarWidth}px`,
        borderBottom: '1px solid #e5e7eb',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>

          <AppBreadcrumbs />
        </Box>
      </Toolbar>
    </AppBar>
  );
}