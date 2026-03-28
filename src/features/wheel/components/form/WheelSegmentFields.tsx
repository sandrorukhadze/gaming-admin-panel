import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import type { CreateWheelFormInput } from "../../model/wheel.schema";

interface WheelSegmentFieldsProps {
  control: Control<CreateWheelFormInput>;
  register: UseFormRegister<CreateWheelFormInput>;
  errors: FieldErrors<CreateWheelFormInput>;
  watch: UseFormWatch<CreateWheelFormInput>;
}

export function WheelSegmentFields({
  control,
  register,
  errors,
  watch,
}: WheelSegmentFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "segments",
  });

  const segments = watch("segments");
  const totalWeight =
    segments?.reduce((sum, segment) => sum + Number(segment.weight || 0), 0) ??
    0;

  function handleAddSegment() {
    if (fields.length >= 12) {
      return;
    }

    append({
      id: crypto.randomUUID(),
      label: "",
      color: "#60a5fa",
      weight: 10,
      prizeType: "coins",
      prizeAmount: 1,
      imageUrl: "",
    });
  }

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight={700}>
          Segments
        </Typography>

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddSegment}
          disabled={fields.length >= 12}
        >
          Add Segment
        </Button>
      </Stack>

      <Typography
        variant="body2"
        color={totalWeight === 100 ? "success.main" : "error.main"}
        mb={2}
      >
        Total Weight: {totalWeight} / 100
      </Typography>

      {typeof errors.segments?.message === "string" ? (
        <Typography color="error" variant="body2" mb={2}>
          {errors.segments.message}
        </Typography>
      ) : null}

      <Stack spacing={2}>
        {fields.map((field, index) => {
          const prizeType = watch(`segments.${index}.prizeType`);

          return (
            <Box
              key={field.id}
              sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
              }}
            >
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography fontWeight={700}>Segment #{index + 1}</Typography>

                  <IconButton
                    color="error"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 2}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                </Stack>

                <TextField
                  label="Label"
                  {...register(`segments.${index}.label`)}
                  error={!!errors.segments?.[index]?.label}
                  helperText={errors.segments?.[index]?.label?.message}
                />

                <TextField
                  label="Color"
                  {...register(`segments.${index}.color`)}
                  error={!!errors.segments?.[index]?.color}
                  helperText={errors.segments?.[index]?.color?.message}
                />

                <TextField
                  label="Weight"
                  type="number"
                  {...register(`segments.${index}.weight`)}
                  error={!!errors.segments?.[index]?.weight}
                  helperText={errors.segments?.[index]?.weight?.message}
                />

                <TextField
                  select
                  label="Prize Type"
                  defaultValue={field.prizeType}
                  {...register(`segments.${index}.prizeType`)}
                  error={!!errors.segments?.[index]?.prizeType}
                  helperText={errors.segments?.[index]?.prizeType?.message}
                >
                  <MenuItem value="coins">Coins</MenuItem>
                  <MenuItem value="freeSpin">Free Spin</MenuItem>
                  <MenuItem value="bonus">Bonus</MenuItem>
                  <MenuItem value="nothing">Nothing</MenuItem>
                </TextField>

                <TextField
                  label="Prize Amount"
                  type="number"
                  disabled={prizeType === "nothing"}
                  {...register(`segments.${index}.prizeAmount`)}
                  error={!!errors.segments?.[index]?.prizeAmount}
                  helperText={errors.segments?.[index]?.prizeAmount?.message}
                />

                <TextField
                  label="Image URL"
                  {...register(`segments.${index}.imageUrl`)}
                  error={!!errors.segments?.[index]?.imageUrl}
                  helperText={errors.segments?.[index]?.imageUrl?.message}
                />

                <input type="hidden" {...register(`segments.${index}.id`)} />
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
