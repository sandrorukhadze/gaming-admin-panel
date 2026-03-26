import { useMemo, useState } from "react";
import {
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { Leaderboard } from "../model/leaderboard.types";
import { DataTable, type Column } from "@/shared/ui/DataTable";
import { CreateLeaderboardModal } from "./CreateLeaderboardModal";

interface LeaderboardTableProps {
  data: Leaderboard[];
}

type StatusFilter = "all" | Leaderboard["status"];
type Order = "asc" | "desc";

function getStatusColor(
  status: Leaderboard["status"],
): "default" | "success" | "warning" {
  if (status === "active") {
    return "success";
  }

  if (status === "draft") {
    return "warning";
  }

  return "default";
}

function getScoringColor(
  scoringType: Leaderboard["scoringType"],
): "primary" | "secondary" | "info" {
  if (scoringType === "points") {
    return "primary";
  }

  if (scoringType === "wins") {
    return "secondary";
  }

  return "info";
}

export function LeaderboardTable({ data }: LeaderboardTableProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [orderBy, setOrderBy] = useState<string>("title");
  const [order, setOrder] = useState<Order>("asc");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  function handleSort(key: string) {
    const isAsc = orderBy === key && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  }

  function handleOpenCreateModal() {
    setIsCreateModalOpen(true);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  const filteredData = useMemo(() => {
    if (statusFilter === "all") {
      return data;
    }

    return data.filter((item) => item.status === statusFilter);
  }, [data, statusFilter]);

  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    sorted.sort((a, b) => {
      let result = 0;

      if (orderBy === "title") {
        result = a.title.localeCompare(b.title);
      }

      if (orderBy === "scoringType") {
        result = a.scoringType.localeCompare(b.scoringType);
      }

      if (orderBy === "startDate") {
        result =
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      }

      if (orderBy === "endDate") {
        result = new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      }

      if (orderBy === "maxParticipants") {
        result = a.maxParticipants - b.maxParticipants;
      }

      return order === "asc" ? result : -result;
    });

    return sorted;
  }, [filteredData, orderBy, order]);

  const columns: Column<Leaderboard>[] = [
    {
      key: "title",
      title: "Title",
      sortable: true,
      render: (row) => (
        <Stack spacing={0.5}>
          <Typography fontWeight={600}>{row.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {row.description}
          </Typography>
        </Stack>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (row) => (
        <Chip
          label={row.status}
          color={getStatusColor(row.status)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      key: "scoringType",
      title: "Scoring",
      sortable: true,
      render: (row) => (
        <Chip
          label={row.scoringType}
          color={getScoringColor(row.scoringType)}
          size="small"
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      key: "startDate",
      title: "Start Date",
      sortable: true,
      render: (row) => new Date(row.startDate).toLocaleDateString(),
    },
    {
      key: "endDate",
      title: "End Date",
      sortable: true,
      render: (row) => new Date(row.endDate).toLocaleDateString(),
    },
    {
      key: "maxParticipants",
      title: "Participants",
      sortable: true,
      render: (row) => row.maxParticipants,
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            color="primary"
            aria-label={`View ${row.title}`}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="secondary"
            aria-label={`Edit ${row.title}`}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            color="error"
            aria-label={`Delete ${row.title}`}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Leaderboards
      </Typography>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={2}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(event) =>
                setStatusFilter(event.target.value as StatusFilter)
              }
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
        >
          Add
        </Button>
      </Stack>

      <DataTable
        data={sortedData}
        columns={columns}
        order={order}
        orderBy={orderBy}
        onSort={handleSort}
      />

      <CreateLeaderboardModal
        open={isCreateModalOpen}
        onClose={handleCloseCreateModal}
      />
    </>
  );
}
