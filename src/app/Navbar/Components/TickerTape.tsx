import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Grid, Button, Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
export default function TickerTape({ tickers }) {
  const [tickerData, setTickerData] = React.useState<Array<any>>();
  const [play, setPlay] = React.useState<boolean>(true);
  useEffect(() => {
    if (tickers.length) {
      // Fetch data for each Ticker one by one
      setTickerData([
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
      ]);
    }
  }, [tickers]);

  if (tickerData === undefined) {
    return null;
  }

  const Ticker = ({ ticker }) => {
    return (
      <Box sx={{ marginTop: "0.34rem" }}>
        <Typography
          sx={{ marginLeft: "1rem" }}
          component="span"
          color="text.primary"
        >{`${ticker.ticker}`}</Typography>
        <Typography
          sx={{
            marginLeft: "1rem",
            textShadow:
              "1px 1px 2px rgba(0, 0, 0, 0.75), -1px -1px 2px rgba(0, 0, 0, 0.75)",
          }}
          component="span"
          variant="subtitle2"
          color={ticker.priceChange.includes("-") ? "#ff0000" : "#00ff00"}
        >{`${ticker.price} ${ticker.priceChange}`}</Typography>
      </Box>
    );
  };

  return (
    <Grid container columns={50} sx={{ backgroundColor: "primary.main" }}>
      <Grid item lg={48}>
        <Suspense fallback={<>...Loading</>}>
          <Marquee play={play}>
            {tickerData.map((ticker) => {
              return <Ticker key={ticker.ticker} ticker={ticker} />;
            })}
          </Marquee>
        </Suspense>
      </Grid>
      <Grid item lg={2}>
        <Button
          onClick={() => setPlay((prev) => !prev)}
          color="secondary"
          startIcon={play ? <PlayArrow /> : <Pause />}
        >
          {play ? "PAUSE" : "PLAY"}
        </Button>
      </Grid>
    </Grid>
  );
}
