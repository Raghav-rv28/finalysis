"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import TradingViewStockChart from "./TradingViewStockChart.jsx";
import Summary from "./Summary";
type Props = { stockData: any };
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
        <Summary stockData={stockData} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TradingViewStockChart
          symbol={`${stockData.Exchange}:${stockData.Symbol}`}
        />
      </CustomTabPanel>
    </div>
  );
}
