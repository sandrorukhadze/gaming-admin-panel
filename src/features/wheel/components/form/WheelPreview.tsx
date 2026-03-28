import { Box } from "@mui/material";
import type { WheelSegment } from "../../model/wheel.types";
import { describeArc, getLabelPosition } from "../../lib/wheel-preview.utils";

interface WheelPreviewProps {
  segments: WheelSegment[];
  backgroundColor: string;
  borderColor: string;
}

export function WheelPreview({
  segments,
  backgroundColor,
  borderColor,
}: WheelPreviewProps) {
  const size = 320;
  const cx = 160;
  const cy = 160;
  const radius = 145;

  let currentAngle = 0;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: backgroundColor,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment) => {
          const startAngle = currentAngle;
          const angle = (segment.weight / 100) * 360;
          const endAngle = currentAngle + angle;
          const labelPosition = getLabelPosition(
            cx,
            cy,
            radius,
            startAngle,
            endAngle,
          );

          currentAngle = endAngle;

          return (
            <g key={segment.id}>
              <path
                d={describeArc({
                  cx,
                  cy,
                  radius,
                  startAngle,
                  endAngle,
                })}
                fill={segment.color}
                stroke={borderColor}
                strokeWidth={2}
              />
              <text
                x={labelPosition.x}
                y={labelPosition.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fontWeight="700"
                fill="#111827"
              >
                {segment.label}
              </text>
            </g>
          );
        })}

        <circle cx={cx} cy={cy} r={28} fill={borderColor} />
      </svg>
    </Box>
  );
}
