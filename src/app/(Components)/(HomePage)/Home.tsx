"use client";

import TopMovers from "./TopMovers";
// MUI IMPORTS
import Container from "@mui/material/Container";
import Indexes from "./Indexes";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";
import NewsList from "./NewsList";
import CryptoCurrency from "./Cryptocurrency";
import MovingNews from "./MovingNews";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

export default function Home() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
          <Grid item sm={11} xs={12}>
            <Box
              sx={{
                maxWidth: { xs: 350, sm: 480, md: 640, lg: 960 },
              }}
            >
              <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                <Tab label="News" />
                <Tab label="CryptoCurrency" />
                <Tab label="Portfolio" />
                <Tab label="WatchList" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <NewsList />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <CryptoCurrency />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Portfolio
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              WatchList
            </CustomTabPanel>
          </Grid>
          {/* TOP MOVERS SECTION */}
          <Grid
            item
            alignSelf="baseline"
            sx={{ justifyContent: "center" }}
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
