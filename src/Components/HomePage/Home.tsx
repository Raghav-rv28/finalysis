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
import { Box, Button } from "@mui/material";

export default async function Home() {
  const session = await getServerSession(options);
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
  } | null = null;
  let watchListData: Array<string> | null;
  if (session) {
    // userData = await getUserData(session.user.email);
  }

  // get watchlist info
  // console.log(userData);
  if (userData !== null) {
    // watchListData = await getWatchListDetails(userData.watchlist);
    // console.log(watchListData);
  }

  return (
    <div style={{ height: "100%" }}>
      <Grid
        container
        sx={{
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
            justifyContent="space-evenly"
            alignItems="center"
            container
            columns={15}
            columnSpacing={1}
            direction="row"
          >
            {/* TAB SECTION */}
            <Grid
              sx={{
                borderRight: 1,
                borderColor: "secondary.main",
              }}
              alignSelf="baseline"
              item
              lg={11}
            >
              <Box>
                {/* <MovingNews /> */}
                <HomeContent />
              </Box>
            </Grid>
            <Grid
              item
              alignSelf="start"
              sx={{
                paddingTop: "2rem",
              }}
              lg={4}
              md={4}
              sm={4}
            >
              {session ? (
                <Watchlist
                  watchlist={
                    watchListData !== undefined && watchListData !== null
                      ? Object.values(watchListData)
                      : []
                  }
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button color="secondary">Sign In</Button>
                </Box>
              )}
              <TopMovers />
            </Grid>
          </Grid>
          {/* TOP MOVERS SECTION */}
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
