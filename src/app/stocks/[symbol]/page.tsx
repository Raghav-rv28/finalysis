"use server";

import { getServerSession } from "next-auth/next";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import stockData from "../../api/data/stock/stockfundamentals.json";
import { getStockData } from "../../../lib/functions/getStockData";
import React from "react";
import TabSection from "../../../Components/StockPage/TabSection";
import { getPeers } from "../../../lib/functions/finnhub";
import options from "../../api/auth/[...nextauth]/options";
import { getUserData } from "../../../lib/functions/database";
import WatchlistButton from "../../../Components/StockPage/WatchlistButton";

export default async function Page({ params }: { params: { symbol: string } }) {
  const session = await getServerSession(options);
  const stockData = await getStockData(params.symbol);

  if (session === undefined || session === null) {
    return null;
  }
  const userData = await getUserData(session.user.email);

  // get watchlist info
  return (
    <div>
      {/* TOP INTRO SECTION */}
      <Grid
        container
        sx={{
          height: "100vh",
          backgroundColor: "primary.main",
          border: "0.1rem #000",
          borderStyle: "solid none none none",
        }}
      >
        {/* artificial Padding */}
        <Grid
          sx={{ backgroundColor: "background.paper" }}
          item
          md={0}
          lg={1}
        ></Grid>
        {/* MAIN CONTENT */}
        <Grid container direction="column" item md={12} lg={10}>
          <Grid
            item
            sx={{
              padding: "2rem",
              width: "100%",
            }}
          >
            <Grid container direction="row">
              <Typography color="text.primary" variant="h4">
                {`${stockData.Name} (${stockData.Symbol})`}
                {/* Client Component */}
                <WatchlistButton
                  watchlist={userData.watchlist}
                  symbol={stockData.Symbol}
                />
              </Typography>
            </Grid>
            <Typography
              color="text.primary"
              variant="h6"
            >{`${stockData.Exchange} - Currency in ${stockData.Currency} (${stockData.Country})`}</Typography>
            <Typography color="text.primary" marginTop="1rem" variant="body2">
              {stockData.Description}
            </Typography>
          </Grid>
          {/* TAB SECTION */}
          <Grid
            item
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            {/* Client Component */}
            <TabSection stockData={stockData} />
          </Grid>
        </Grid>
        {/* artificial Padding */}
        <Grid
          sx={{ backgroundColor: "background.paper" }}
          item
          md={0}
          lg={1}
        ></Grid>
      </Grid>
    </div>
  );
}
