"use server";
import TopMovers from "./TopMovers";
// MUI IMPORTS
import Grid from "@mui/material/Grid";
import React from "react";
import MovingNews from "./MovingNews";
import HomeContent from "./HomeContent";
import { getUserData } from "../../lib/functions/database";
import { getServerSession } from "next-auth/next";
import { getWatchListDetails } from "../../lib/functions/twelveData";
import Watchlist from "./Watchlist";
import options from "../../app/api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
  } | null = null;
  let watchListData: Array<string> | null;
  if (session) {
    userData = await getUserData(session.user.email);
  }

  // get watchlist info
  console.log(userData);
  if (userData !== null) {
    watchListData = await getWatchListDetails(userData.watchlist);
    console.log(watchListData);
  }

  return (
    <div>
      <Grid
        container
        sx={{
          height: "100vh",
          backgroundColor: "primary.main",
          border: "0.1rem #000",
          borderStyle: "solid none none none",
        }}
      >
        <Grid
          sx={{ backgroundColor: "background.paper" }}
          item
          md={0}
          lg={1}
        ></Grid>
        <Grid item md={12} lg={10}>
          {/* INDEXES/MARKETS CHART SECTION */}

          <Grid
            justifyContent="center"
            alignItems="center"
            container
            columns={15}
            columnSpacing={1}
            direction="row"
          >
            {/* TAB SECTION */}
            <Grid alignSelf="baseline" item sm={11} xs={12}>
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                wrap="nowrap"
              >
                <Grid item sx={{ marginTop: "1rem", overflow: "hidden" }}>
                  <MovingNews />
                </Grid>
              </Grid>
              <HomeContent />
            </Grid>
            {/* TOP MOVERS SECTION */}
            <Grid
              item
              alignSelf="start"
              sx={{
                paddingTop: "2rem",
                borderLeft: 1,
                borderColor: "secondary.main",
                height: "100vh",
              }}
              lg={4}
              md={4}
              sm={4}
            >
              <Watchlist
                watchlist={
                  watchListData !== undefined && watchListData !== null
                    ? Object.values(watchListData)
                    : []
                }
              />
              <TopMovers />
            </Grid>
          </Grid>
        </Grid>
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
