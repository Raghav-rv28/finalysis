"use client";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import TradingViewChart from "../TradingViewChart";
import HeatMap from "./HeatMap";
import Grid from "@mui/material/Grid";
import { getMonth, getYear } from "date-fns";
import { CalendarGrid, SectorGrid } from "./SectorGrids";

type Props = { globalSectorData: any };
const currentYear = getYear(new Date());
//  c=[36.73,39.24,36.93,40.59,38.21,37.38,37.75,36.04,37.69,38.19,37.02,33.95 ]
// t=[1664582400,1667260800,1669852800,1672531200,1675209600,1677628800,1680307200,1682899200,1685577600,1688169600,1690848000,1693526400]
function getMonthlyChange(params, month, year): string {
  let result: number = 0;
  params.data.data.t.forEach((d, i) => {
    if (month === getMonth(d * 1000) && getYear(d * 1000) === year) {
      const prevMonthClose = params.data.data.c[i - 1];
      const MonthClose = params.data.data.c[i];
      if (prevMonthClose - MonthClose !== 0)
        result = ((prevMonthClose - MonthClose) / MonthClose) * 100;
    }
  });
  if (result === 0) {
    return "N/A";
  }

  return `${result.toFixed(2)}%`;
  // return change of previous month and this months close
}
export default function MarketOverview({ globalSectorData }: Props) {
  const [rowData, setRowData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([]);
  const [calendarData, setCalendarData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([]);
  const [SectorColumnData, setSectorColumnData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([
    { field: "symbol", width: 50 },
    { field: "name", headerName: "Sector" },
    { field: "previous_close", headerName: "Last Price" },
    { field: "percent_change", headerName: "Change %" },
    { field: "average_volume", headerName: "Volume" },
    {
      field: "fifty_two_week.range",
      headerName: "52w Range",
    },
  ]);
  const [CalendarColumnData, setCalendarColumnData] = React.useState<
    Array<{ [key: string]: any }>
  >([]);

  useEffect(() => {
    setRowData(
      Object.values(globalSectorData.data).map((val: any) => val.quote)
    );
    const temp: any = [];
    Object.keys(globalSectorData.data).forEach((val: any) => {
      const sectorData = {
        symbol: val,
        data: globalSectorData.data[val].series,
      };
      temp.push(sectorData);
    });
    setCalendarData(temp);
    setCalendarColumnData(
      [
        "0",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ].map((val, i) => {
        if (val === "0") {
          return {
            width: "100",
            field: "symbol",
            headerName: "Ticker",
          };
        }
        return {
          headerName: val,
          width: 100,
          cellStyle: (params) => {
            if (params.value.includes("-")) {
              return { backgroundColor: "#82222b" };
            }
            return { backgroundColor: "#1e7632" };
          },
          valueGetter: (params) => {
            return getMonthlyChange(params, i, currentYear);
          },
        };
      })
    );
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
        <Grid item xs={12} md={6}>
          <TradingViewChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <HeatMap />
        </Grid>
        <Grid item xs={12} md={6}>
          <SectorGrid
            rowData={rowData}
            columnData={SectorColumnData}
            theme={theme}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CalendarGrid
            columnData={CalendarColumnData}
            data={calendarData}
            theme={theme}
          />
        </Grid>
      </Grid>
    </div>
  );
}
