"use client";
import Container from "@mui/material/Container";
import Indexes from "./Components/Indexes";
import TickerTape from "./Components/TickerTape";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#252525" }}>
      <Container
        maxWidth="xl"
        sx={{ height: "100vh", backgroundColor: "primary.main" }}
      >
        <Indexes indexes={["SPY"]} />
        <TickerTape tickers={["spy"]} />
      </Container>
    </div>
  );
}
