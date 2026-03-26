import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/app/layout/AppSidebar';
import { AppTopbar } from '@/app/layout/AppTopbar';

const SIDEBAR_WIDTH = 240;

export function AdminLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppSidebar width={SIDEBAR_WIDTH} />

      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <AppTopbar sidebarWidth={SIDEBAR_WIDTH} />
        <Toolbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}