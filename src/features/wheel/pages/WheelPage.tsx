import { Alert, Box, CircularProgress } from "@mui/material";
import { useWheels } from "../hooks/useWheels";
import { WheelTable } from "../components/table/WheelTable";

export function WheelsPage() {
  const { data, isLoading, isError } = useWheels();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data) {
    return <Alert severity="error">Failed to load wheels</Alert>;
  }

  return <WheelTable data={data} />;
}
