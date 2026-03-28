import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { WheelPreview } from "./WheelPreview";
import type { Wheel } from "../../model/wheel.types";

interface WheelDetailViewProps {
  wheel: Wheel;
}

function getStatusColor(
  status: Wheel["status"],
): "default" | "success" | "warning" {
  if (status === "active") {
    return "success";
  }

  if (status === "draft") {
    return "warning";
  }

  return "default";
}

export function WheelDetailView({ wheel }: WheelDetailViewProps) {
  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h5" fontWeight={700}>
          {wheel.name}
        </Typography>

        <Typography color="text.secondary" mt={1}>
          {wheel.description}
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
        <Chip
          label={wheel.status}
          color={getStatusColor(wheel.status)}
          sx={{ textTransform: "capitalize" }}
        />
        <Chip label={`Spin Cost: ${wheel.spinCost}`} variant="outlined" />
        <Chip
          label={`Max Spins/User: ${wheel.maxSpinsPerUser}`}
          variant="outlined"
        />
        <Chip label={`Segments: ${wheel.segments.length}`} variant="outlined" />
      </Stack>

      <WheelPreview
        segments={wheel.segments}
        backgroundColor={wheel.backgroundColor}
        borderColor={wheel.borderColor}
      />

      <Divider />

      <Typography variant="h6" fontWeight={700}>
        Segments
      </Typography>

      <Stack spacing={2}>
        {wheel.segments.map((segment) => (
          <Box
            key={segment.id}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              useFlexGap
            >
              <Typography fontWeight={700}>{segment.label}</Typography>
              <Chip
                size="small"
                label={segment.prizeType}
                sx={{ textTransform: "capitalize" }}
              />
            </Stack>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Weight: {segment.weight}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Prize Amount: {segment.prizeAmount}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Color: {segment.color}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
