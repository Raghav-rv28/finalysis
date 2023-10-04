"use server";
import TopMovers from "./SideBar/TopMovers";
// MUI IMPORTS
import Grid from "@mui/material/Grid";
import React, { Suspense } from "react";
import HomeContent from "./HomeContent";
import { getItem } from "../../lib/functions/database";
import { getServerSession } from "next-auth/next";
import options from "../../app/api/auth/[...nextauth]/options";
import { Box, Button } from "@mui/material";
import WatchlistServerWrapper from "./SideBar/WatchlistServerWrapper";
import Loading from "../../app/loading";
import MOServerWrapper from "./Tab Section/MOServerWrapper";

export default async function Home() {
  const session = await getServerSession(options);
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
  } | null = null;
  let globalSectorData: any;
  let globalTopMoversData: any;
  let globalCryptoData: any;
  if (session) {
    console.log(session);
    // userData = await getItem("USER", `USER-PROFILE-${session.user.email}`);
  }

  // get watchlist info
  console.log(userData);
  if (userData !== null && userData !== undefined) {
    // querying will generate multiple items.
    globalTopMoversData = await getItem("GLOBAL", "GLOBAL-TOP-MOVERS-LATEST");
    globalCryptoData = await getItem("GLOBAL", "GLOBAL-CRYPTO-LATEST");
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
                <HomeContent>
                  <MOServerWrapper session={session} />
                </HomeContent>
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
              <Suspense fallback={<Loading />}>
                <WatchlistServerWrapper session={session} />
              </Suspense>
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
