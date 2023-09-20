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
          <Tab label="CryptoCurrency" />
          <Tab label="Indexes" />
          <Tab label="News" />
          <Tab label="WatchList" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CryptoCurrency />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TradingViewChart />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <NewsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        WatchList
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
