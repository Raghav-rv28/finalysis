"use client";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";
import React from "react";
import { ListItem } from "@mui/material";

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

const values = [
  "Sector",
  "Industry",
  "MarketCapitalization",
  "EPS",
  "EBITDA",
  "PERatio",
  "BookValue",
  "AnalystTargetPrice",
  "ForwardPE",
  "Beta",
  "52WeekHigh",
  "52WeekLow",
];
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
        <List sx={{ backgroundColor: "background.paper" }} dense>
          {Object.keys(stockData).map((val: string) => {
            if (values.includes(val)) {
              return (
                <div key={val}>
                  <ListItem>{`${val}: ${stockData[val]}`}</ListItem>
                  <Divider />
                </div>
              );
            }
            return null;
          })}
        </List>
      </CustomTabPanel>
    </div>
  );
}
