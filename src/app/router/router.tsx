import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '@/app/layout/AdminLayout';
import { LeaderboardsPage } from '@/features/leaderboard/pages/LeaderboardsPage';
import { RafflesPage } from '@/features/raffle/pages/RafflesPage';
import { WheelPage } from '@/features/wheel/pages/WheelPage';
import { ROUTES } from '@/shared/constants/routes';

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <LeaderboardsPage />,
        handle: { breadcrumb: 'Leaderboards' },
      },
      {
        path: ROUTES.leaderboards.slice(1),
        element: <LeaderboardsPage />,
        handle: { breadcrumb: 'Leaderboards' },
      },
      {
        path: ROUTES.raffles.slice(1),
        element: <RafflesPage />,
        handle: { breadcrumb: 'Raffles' },
      },
      {
        path: ROUTES.wheel.slice(1),
        element: <WheelPage />,
        handle: { breadcrumb: 'Wheel' },
      },
    ],
  },
]);