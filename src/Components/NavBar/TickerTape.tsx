"use client";
import { Pause, PlayArrow } from "@mui/icons-material";
import { Box, Grid, Button, Typography } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import Marquee from "react-fast-marquee";
import data from "../../app/api/data/global/indexquote.json";
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
      <Box sx={{ marginTop: "0.34rem", marginRight: "1rem" }}>
        <Typography
          sx={{ marginLeft: "1rem" }}
          component="span"
          color="text.primary"
        >{`${ticker.symbol}`}</Typography>
        <Typography
          sx={{
            borderRadius: "10px",
            marginLeft: "1rem",
            padding: "0.2rem",
            backgroundColor: ticker.percent_change.includes("-")
              ? "rgba(255,0,0,0.6)"
              : "rgba(0,255,0,0.6)",
          }}
          component="span"
          variant="subtitle2"
          color="text.primary"
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
