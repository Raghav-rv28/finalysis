"use server";
// MUI IMPORTS
import Grid from "@mui/material/Grid";
import React, { Suspense } from "react";
import HomeContent from "../Components/HomePage/HomeContent";
import { getItem } from "../lib/functions/database";
import { getServerSession } from "next-auth/next";
import options from "../app/api/auth/[...nextauth]/options";
import WatchlistServerWrapper from "../Components/HomePage/SideBar/WatchlistServerWrapper";
import Loading from "../app/loading";
import TopMovers from "../Components/HomePage/SideBar/TopMovers";
import MOServerWrapper from "../Components/HomePage/Tab Section/MOServerWrapper";

export default async function Homepage() {
  const session = await getServerSession(options);
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
    configuration: {
      mode: string;
    };
  } | null = null;
  // let globalSectorData: any;
  // let globalCryptoData: any;
  if (session) {
    userData = await getItem(
      "USER",
      `USER-PROFILE-${session.user.email}`,
      session.token
    );
  }

  const globalTopMoversData = await getItem(
    "GLOBAL",
    "GLOBAL-TOP-MOVERS-LATEST"
  );
  // // get watchlist info
  console.log(userData);
  //   // querying will generate multiple items.
  //   globalCryptoData = await getItem("GLOBAL", "GLOBAL-CRYPTO-LATEST");

  // console.log(globalTopMoversData);

  return (
    <main style={{ height: "100%" }}>
      <Grid
        container
        sx={{
          background:
            userData?.configuration?.mode === "light"
              ? "linear-gradient(to right bottom, #fff, #fff176)"
              : "linear-gradient(to right bottom, #202020, #4a148c)",
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
              {/* INDEXES/MARKETS CHART SECTION */}
              <HomeContent>
                <MOServerWrapper session={session} />
              </HomeContent>
            </Grid>
            <Grid
              item
              alignSelf="start"
              sx={{
                background: "inherit",
                paddingTop: "2rem",
              }}
              lg={4}
              md={4}
              sm={4}
            >
              <Suspense fallback={<Loading />}>
                <WatchlistServerWrapper session={session} />
              </Suspense>
              <Suspense fallback={<Loading />}>
                <TopMovers data={globalTopMoversData} />
              </Suspense>
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
    </main>
  );
}
