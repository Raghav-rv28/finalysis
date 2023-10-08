import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <CircularProgress color="secondary" />
    </Box>
  );
}
