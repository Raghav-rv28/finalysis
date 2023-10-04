"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CryptoCurrency from "./Tab Section/Cryptocurrency";
import NewsList from "./Tab Section/NewsList";
import React, { Suspense } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EarningsCalendar from "./Tab Section/EarningsCalendar";
import Grid from "@mui/material/Grid";
import StockGrid from "./Top Section/StockGrid";
import GaugeComponent from "@studioriccardolardi/react-gauge-chart-pr132";
import CryptoGrid from "./Top Section/CryptoGrid";
import { Session } from "next-auth";
import Loading from "../../app/loading";
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

export function getValue() {
  return 26;
}
type Props = { children: React.ReactNode };

export default function HomeContent({ children }: Props) {
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
        justifyContent="space-evenly"
        alignItems="center"
        direction="row"
        sx={{ mb: "1rem", mt: "1rem" }}
      >
        <Grid item>
          <StockGrid />
        </Grid>
        <Grid item>
          <GaugeComponent
            arc={{
              subArcs: [
                {
                  limit: 20,
                  color: "#EA4228",
                  showTick: true,
                },
                {
                  limit: 40,
                  color: "#F58B19",
                  showTick: true,
                },
                {
                  limit: 60,
                  color: "#F5CD19",
                  showTick: true,
                },
                {
                  limit: 100,
                  color: "#5BE12C",
                  showTick: true,
                },
              ],
            }}
            value={45}
          />
        </Grid>
        <Grid item sx={{ width: 450, backgroundColor: "#121212" }}>
          <CryptoGrid />
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
          <Tab label="Mkt. Overview" />
          <Tab label="News" />
          <Tab label="Earnings" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CryptoCurrency />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
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
