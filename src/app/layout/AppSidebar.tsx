import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { ROUTES } from "@/shared/constants/routes";

interface AppSidebarProps {
  width: number;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Leaderboards",
    path: ROUTES.leaderboards,
    icon: <EmojiEventsOutlinedIcon />,
  },
  {
    label: "Raffles",
    path: ROUTES.raffles,
    icon: <CasinoOutlinedIcon />,
  },
  {
    label: "Wheel",
    path: ROUTES.wheel,
    icon: <AutorenewOutlinedIcon />,
  },
];

export function AppSidebar({ width }: AppSidebarProps) {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width,
          boxSizing: "border-box",
          borderRight: "1px solid #e5e7eb",
          bgcolor: "background.paper",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          Gaming Admin
        </Typography>
      </Toolbar>

      <Divider />

      <Box sx={{ p: 1.5 }}>
        <List>
          {navItems.map((item) => {
            const selected = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                selected={selected}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
