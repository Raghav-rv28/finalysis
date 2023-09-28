"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CryptoCurrency from "./Cryptocurrency";
import NewsList from "./NewsList";
import TradingViewChart from "./TradingViewChart";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HeatMap from "./HeatMap";
import EarningsCalendar from "./EarningsCalendar";
import Grid from "@mui/material/Grid";
import StockGrid from "./StockGrid";
import { Chart } from "react-google-charts";
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
      <Box sx={{ p: 3, margin: "auto" }}>{children}</Box>
    </div>
  );
}
function getRandomNumber() {
  return Math.random() * 100;
}

export function getValue() {
  return 26;
}
type Props = {};

export default function HomeContent({}: Props) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState<boolean>(true);
  // Local Functions

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Grid item>
          <StockGrid />
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chart
            chartType="Gauge"
            width="100%"
            height="150px"
            data={[
              ["Label", "Value"],
              ["F&G Index", getValue()],
            ]}
            options={{
              minorTicks: 5,
            }}
          />
        </Grid>
        <Grid item sx={{ width: 450, backgroundColor: "#121212" }}>
          Crypto Grid
        </Grid>
      </Grid>
      <Box>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="CryptoCurrency" />
          <Tab label="Indexes" />
          <Tab label="News" />
          <Tab label="Earnings" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CryptoCurrency />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          spacing={2}
        >
          <Grid item lg={8}>
            <TradingViewChart />
          </Grid>
          <Grid item lg={4}>
            <HeatMap />
          </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <NewsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <EarningsCalendar />
      </CustomTabPanel>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          Website Under Construction
        </Alert>
      </Snackbar>
    </div>
  );
}
