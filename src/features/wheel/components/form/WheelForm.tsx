import { Box, Button, MenuItem, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { WheelSegmentFields } from "./WheelSegmentFields";
import { WheelPreview } from "./WheelPreview";
import {
  createWheelSchema,
  type CreateWheelFormInput,
  type CreateWheelFormValues,
} from "../../model/wheel.schema";

interface WheelFormProps {
  defaultValues: CreateWheelFormInput;
  submitLabel: string;
  onSubmit: (values: CreateWheelFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmittingExternal?: boolean;
}

export function WheelForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
  isSubmittingExternal,
}: WheelFormProps) {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateWheelFormInput, unknown, CreateWheelFormValues>({
    resolver: zodResolver(createWheelSchema),
    defaultValues,
  });

  const segments = watch("segments");
  const backgroundColor = watch("backgroundColor");
  const borderColor = watch("borderColor");

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="Name"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Description"
          multiline
          minRows={3}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <TextField
          select
          label="Status"
          defaultValue={defaultValues.status}
          {...register("status")}
          error={!!errors.status}
          helperText={errors.status?.message}
        >
          <MenuItem value="draft">Draft</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          label="Max Spins Per User"
          type="number"
          {...register("maxSpinsPerUser")}
          error={!!errors.maxSpinsPerUser}
          helperText={errors.maxSpinsPerUser?.message}
        />

        <TextField
          label="Spin Cost"
          type="number"
          {...register("spinCost")}
          error={!!errors.spinCost}
          helperText={errors.spinCost?.message}
        />

        <TextField
          label="Background Color"
          {...register("backgroundColor")}
          error={!!errors.backgroundColor}
          helperText={errors.backgroundColor?.message}
        />

        <TextField
          label="Border Color"
          {...register("borderColor")}
          error={!!errors.borderColor}
          helperText={errors.borderColor?.message}
        />

        <WheelSegmentFields
          control={control}
          register={register}
          errors={errors}
          watch={watch}
        />

        <WheelPreview
          segments={segments}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isSubmittingExternal}
          >
            {submitLabel}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
