import TopMovers from "./TopMovers";
// MUI IMPORTS
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import MovingNews from "./MovingNews";
import HomeContent from "./HomeContent";

export default async function Home() {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          height: "100vh",
          backgroundColor: "primary.main",
          border: "0.1rem #000",
          borderStyle: "solid none none none",
        }}
      >
        {/* INDEXES/MARKETS CHART SECTION */}
        <Grid container direction="row" alignItems="flex-start" wrap="nowrap">
          <Grid item sx={{ marginTop: "1rem", overflow: "hidden" }}>
            <MovingNews />
          </Grid>
        </Grid>
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
            <HomeContent />
          </Grid>
          {/* TOP MOVERS SECTION */}
          <Grid
            item
            alignSelf="baseline"
            sx={{ paddingTop: "2rem", justifyContent: "center" }}
            lg={4}
            md={4}
            sm={4}
          >
            <TopMovers />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
