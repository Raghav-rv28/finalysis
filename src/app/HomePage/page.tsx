import Box from "@mui/material/Box";
import Indexes from "./Components/Indexes";
import Container from "@mui/material/Container";

export default function HomePage() {
  return (
    <div>
      <Container
        disableGutters
        maxWidth="xl"
        sx={{ height: 1960, backgroundColor: "primary.dark" }}
      >
        <Indexes />
      </Container>
    </div>
  );
}
