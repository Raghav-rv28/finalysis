import React, { useEffect } from "react";
import TradingViewChart from "./TradingViewChart";
import HeatMap from "./HeatMap";
import Grid from "@mui/material/Grid";
import "ag-grid-community/styles/ag-grid.css";
import { useTheme } from "@mui/material/styles";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import { AgGridReact } from "ag-grid-react";

type Props = { globalSectorData: any };

function SectorGrid({
  theme,
  columnData,
  rowData,
}: {
  theme: any;
  columnData: Array<{ [key: string]: any }>;
  rowData: Array<{ [key: string]: string | number }>;
}) {
  return (
    <div
      className={
        theme.palette.mode === "dark"
          ? "ag-theme-alpine-dark"
          : "ag-theme-alpine"
      }
      style={{ width: "100%", height: 500 }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnData} />
    </div>
  );
}
export default function MarketOverview({ globalSectorData }: Props) {
  const [rowData, setRowData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([]);
  const [columnData, setColumnData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([
    { field: "symbol", width: "50" },
    { field: "name", headerName: "Sector" },
    { field: "previous_close", headerName: "Last Price" },
    { field: "percent_change", headerName: "Change %" },
    { field: "average_volume", headerName: "Volume" },
    {
      field: "fifty_two_week.range",
      headerName: "52w Range",
    },
  ]);

  useEffect(() => {
    console.log(Object.values(globalSectorData.data));
    setRowData(Object.values(globalSectorData.data));
  }, []);
  const theme = useTheme();
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        spacing={2}
      >
        <Grid item xs={12} md={6} xl={8}>
          <TradingViewChart />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <HeatMap />
        </Grid>
        <Grid item xs={12} md={6}>
          <SectorGrid rowData={rowData} columnData={columnData} theme={theme} />
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </div>
  );
}
