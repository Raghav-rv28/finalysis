"use client";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Grid, Button, Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
import data from "../../api/data/indexquote.json";
export default function TickerTape({ tickers }) {
  const [tickerData, setTickerData] = React.useState<any>();
  const [play, setPlay] = React.useState<boolean>(true);

  useEffect(() => {
    if (tickers.length) {
      // Fetch data for each Ticker one by one
      setTickerData(data);
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
        >{`${ticker.symbol}`}</Typography>
        <Typography
          sx={{
            marginLeft: "1rem",
            textShadow:
              "1px 1px 2px rgba(0, 0, 0, 0.75), -1px -1px 2px rgba(0, 0, 0, 0.75)",
          }}
          component="span"
          variant="subtitle2"
          color={ticker.percent_change.includes("-") ? "#ff0000" : "#00ff00"}
        >{`${ticker.open} ${ticker.percent_change}%`}</Typography>
      </Box>
    );
  };

  return (
    <Grid container columns={50} sx={{ backgroundColor: "primary.main" }}>
      <Grid item lg={48}>
        <Suspense fallback={<>...Loading</>}>
          <Marquee play={play}>
            {Object.values(tickerData).map(
              (ticker: {
                symbol: string;
                name: string;
                volume: string;
                open: string;
                change: string;
                percent_change: string;
              }) => {
                return <Ticker key={ticker.symbol} ticker={ticker} />;
              }
            )}
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
