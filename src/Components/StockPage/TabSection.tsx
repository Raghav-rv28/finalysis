"use client";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Typography } from "@mui/material";
import millify from "millify";
import { styled } from "@mui/material/styles";

type Props = { stockData: any };

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));
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

export default function TabSection({ stockData }: Props) {
  const [value, setValue] = React.useState(0);
  // Local Functions

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
      >
        <Tab label="Summary" />
        <Tab label="Chart" />
        <Tab label="Financial" />
        <Tab label="Analysis" />
        <Tab label="Related News" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <Grid spacing={3} container direction="row">
          <Grid item md={6}>
            {/* GENERAL STUFF*/}
            <List
              sx={{ backgroundColor: "background.paper", marginBottom: "1rem" }}
              dense
            >
              <ListItem sx={{ backgroundColor: "secondary.main" }}>
                <Typography color="primary">GENERAL</Typography>
              </ListItem>
              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Sector:"}</StyledTypography>
                  <StyledTypography>{stockData.Sector}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Industry:"}</StyledTypography>
                  <StyledTypography>{stockData.Industry}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Address:"}</StyledTypography>
                  <StyledTypography>{stockData.Address}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Fiscal Year End:"}</StyledTypography>
                  <StyledTypography>{stockData.FiscalYearEnd}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Latest Quarter:"}</StyledTypography>
                  <StyledTypography>{stockData.LatestQuarter}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>
                    {"Quarterly Earnings Growth(YOY):"}
                  </StyledTypography>
                  <StyledTypography>
                    {stockData.QuarterlyEarningsGrowthYOY}%
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>
                    {"Quarterly Revenue Growth(YOY):"}
                  </StyledTypography>
                  <StyledTypography>
                    {stockData.QuarterlyRevenueGrowthYOY}%
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Analyst Target Price:"}</StyledTypography>
                  <StyledTypography>
                    {stockData.AnalystTargetPrice}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"EBITDA:"}</StyledTypography>
                  <StyledTypography>
                    ${String(millify(Number(stockData.EBITDA)))}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Shares Outstanding:"}</StyledTypography>
                  <StyledTypography>
                    ${String(millify(Number(stockData.SharesOutstanding)))}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
            </List>

            {/* PRICE HIGHLIGHTS */}
            <List
              sx={{ backgroundColor: "background.paper", marginBottom: "1rem" }}
              dense
            >
              <ListItem sx={{ backgroundColor: "secondary.main" }}>
                <Typography color="primary">PRICE HIGHLIGHTS</Typography>
              </ListItem>

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Beta:"}</StyledTypography>
                  <StyledTypography>{stockData.Beta}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"52 Week High:"}</StyledTypography>
                  <StyledTypography>{stockData["52WeekHigh"]}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"52 Week Low:"}</StyledTypography>
                  <StyledTypography>{stockData["52WeekLow"]}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>
                    {"50 Day Moving Average:"}
                  </StyledTypography>
                  <StyledTypography>
                    {stockData["50DayMovingAverage"]}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>
                    {"200 Day Moving Average:"}
                  </StyledTypography>
                  <StyledTypography>
                    {stockData["200DayMovingAverage"]}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
            </List>
          </Grid>
          {/* DIVIDEND STUFF*/}
          <Grid item md={6}>
            <List
              sx={{
                width: "auto",
                backgroundColor: "background.paper",
                marginBottom: "1rem",
              }}
              dense
            >
              <ListItem sx={{ backgroundColor: "secondary.main" }}>
                <Typography color="primary">DIVIDENDS</Typography>
              </ListItem>
              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Ex Dividend Date:"}</StyledTypography>
                  <StyledTypography>
                    {stockData.ExDividendDate}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Dividend Date:"}</StyledTypography>
                  <StyledTypography>{stockData.DividendDate}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Dividend Yield:"}</StyledTypography>
                  <StyledTypography>
                    {stockData.DividendYield}%
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Dividend Per Share:"}</StyledTypography>
                  <StyledTypography>
                    {stockData.DividendPerShare}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
            </List>
            {/* FINANCIAL SUMMARY */}
            <List
              sx={{ width: "auto", backgroundColor: "background.paper" }}
              dense
            >
              <ListItem sx={{ backgroundColor: "secondary.main" }}>
                <Typography color="primary">FINANCIAL HIGHLIGHTS</Typography>
              </ListItem>

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Market Cap:"}</StyledTypography>
                  <StyledTypography>
                    ${String(millify(Number(stockData.MarketCapitalization)))}
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"P/E Ratio:"}</StyledTypography>
                  <StyledTypography>{stockData.PERatio}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Earnings Per Share:"}</StyledTypography>
                  <StyledTypography>${stockData.EPS}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />

              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Profit Margin:"}</StyledTypography>
                  <StyledTypography>{stockData.ProfitMargin}%</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Operating Margin TTM:"}</StyledTypography>
                  <StyledTypography>
                    {stockData.OperatingMarginTTM}%
                  </StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Trailing PE:"}</StyledTypography>
                  <StyledTypography>{stockData.TrailingPE}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
              <ListItem>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <StyledTypography>{"Forward PE:"}</StyledTypography>
                  <StyledTypography>{stockData.ForwardPE}</StyledTypography>
                </Grid>
              </ListItem>
              <Divider light />
            </List>
          </Grid>
        </Grid>
      </CustomTabPanel>
    </div>
  );
}
