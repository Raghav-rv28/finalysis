"use client";
import Container from "@mui/material/Container";
import Indexes from "./Components/Indexes";
import Grid from "@mui/material/Grid";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#252525" }}>
      <Container
        maxWidth="xl"
        sx={{ height: "100vh", backgroundColor: "primary.main" }}
      >
        <Grid container direction="column" wrap="nowrap">
          <Grid item>
            <Indexes
              indexes={[
                {
                  ticker: "SPY",
                  name: "S&P 500",
                  price: "447.59",
                  priceChange: "+0.4%",
                },
                {
                  ticker: "QQQ",
                  name: "NASDAQ",
                  price: "375.59",
                  priceChange: "-0.4%",
                },
                {
                  ticker: "DIA",
                  name: "DOW JONES",
                  price: "349.59",
                  priceChange: "+1.4%",
                },
                {
                  ticker: "IWM",
                  name: "Russell 2k",
                  price: "183.59",
                  priceChange: "+0.4%",
                },
                {
                  ticker: "BTCUSD",
                  name: "BITCOIN",
                  price: "26468.5",
                  priceChange: "-1.4%",
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
