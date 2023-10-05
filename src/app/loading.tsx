import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <CircularProgress />
    </Box>
  );
}
