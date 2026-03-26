import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useMatches } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';

interface RouteHandle {
  breadcrumb?: string;
}

interface BreadcrumbItem {
  label: string;
  path: string;
}

export function AppBreadcrumbs() {
  const matches = useMatches();

  const items: BreadcrumbItem[] = matches
    .filter((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return Boolean(handle?.breadcrumb);
    })
    .map((match) => {
      const handle = match.handle as RouteHandle;
      return {
        label: handle.breadcrumb ?? '',
        path: match.pathname,
      };
    });

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ mt: 0.5 }}
    >
      <Link
        component={RouterLink}
        to={ROUTES.home}
        underline="hover"
        color="inherit"
        sx={{ fontSize: 14 }}
      >
        Home
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (isLast) {
          return (
            <Typography key={item.path} color="text.secondary" sx={{ fontSize: 14 }}>
              {item.label}
            </Typography>
          );
        }

        return (
          <Link
            key={item.path}
            component={RouterLink}
            to={item.path}
            underline="hover"
            color="inherit"
            sx={{ fontSize: 14 }}
          >
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}