import React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import millify from "millify";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

type Props = { stockData: any };

export default function Summary({ stockData }: Props) {
  return (
    <div>
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
                <StyledTypography>{"50 Day Moving Average:"}</StyledTypography>
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
                <StyledTypography>{"200 Day Moving Average:"}</StyledTypography>
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
                <StyledTypography>{stockData.ExDividendDate}</StyledTypography>
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
                <StyledTypography>{stockData.DividendYield}%</StyledTypography>
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
            <ListItem>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <StyledTypography>{"Book Value:"}</StyledTypography>
                <StyledTypography>{stockData.BookValue}</StyledTypography>
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
                <StyledTypography>{"PEG Ratio:"}</StyledTypography>
                <StyledTypography>{stockData.PEGRatio}</StyledTypography>
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
                <StyledTypography>{"Return On Assets TTM:"}</StyledTypography>
                <StyledTypography>
                  {stockData.ReturnOnAssetsTTM}
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
                <StyledTypography>{"Return On Equity TTM:"}</StyledTypography>
                <StyledTypography>
                  {stockData.ReturnOnEquityTTM}
                </StyledTypography>
              </Grid>
            </ListItem>
            <Divider light />
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
