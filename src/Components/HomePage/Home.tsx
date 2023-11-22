"use server";
import TopMovers from "./SideBar/TopMovers";
// MUI IMPORTS
import Grid from "@mui/material/Grid";
import React, { Suspense } from "react";
import HomeContent from "./HomeContent";
import { getItem } from "../../lib/functions/database";
import { getServerSession } from "next-auth/next";
import options from "../../app/api/auth/[...nextauth]/options";
import WatchlistServerWrapper from "./SideBar/WatchlistServerWrapper";
import Loading from "../../app/loading";
import MOServerWrapper from "./Tab Section/MOServerWrapper";
import { useTheme } from "@mui/material/styles";
import { useStore } from "../../lib/store";

export default async function Home() {
  const session = await getServerSession(options);
  let userData: {
    itemId: string;
    itemType: string;
    watchlist: Array<string>;
  } | null = null;
  // let globalSectorData: any;
  // let globalCryptoData: any;
  if (session) {
    console.log(session);
    userData = await getItem("USER", `USER-PROFILE-${session.user.email}`);
  }
  const globalTopMoversData = await getItem(
    "GLOBAL",
    "GLOBAL-TOP-MOVERS-LATEST"
  );
  const mode = useStore.getState().mode;
  console.log(mode);
  // // get watchlist info
  // console.log(userData);
  //   // querying will generate multiple items.
  //   globalCryptoData = await getItem("GLOBAL", "GLOBAL-CRYPTO-LATEST");

  // console.log(globalTopMoversData);

  return (
    <div style={{ height: "100%" }}>
      <Grid
        container
        sx={{
          background:
            mode === "dark"
              ? "linear-gradient(to right bottom, #202020, #4a148c)"
              : "linear-gradient(to right bottom, #fff, #fff176)",
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
    </div>
  );
}
