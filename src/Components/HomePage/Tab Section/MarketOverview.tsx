"use client";
import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import TradingViewChart from "../TradingViewChart";
import HeatMap from "./HeatMap";
import Grid from "@mui/material/Grid";
import { getMonth, getYear } from "date-fns";
import { CalendarGrid, SectorGrid } from "./SectorGrids";
import millify from "millify";
import { Stack, Slider } from "@mui/material";
import "./styles.css";

type Props = { globalSectorData: any };
const currentYear = getYear(new Date());

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

const get52WRange = (params) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Slider
        sx={{
          pt: "1rem",
          maxWidth: 200,
          [".Mui-disabled"]: {
            color: "secondary.main",
          },
        }}
        disabled
        size="small"
        color="secondary"
        value={params.data.previous_close}
        marks={[
          {
            value: 0,
            label: `${(
              Math.round(Number(params.data.fifty_two_week.low) * 100) / 100
            ).toFixed(2)}`,
          },
          {
            value: 100,
            label: `${(
              Math.round(Number(params.data.fifty_two_week.high) * 100) / 100
            ).toFixed(2)}`,
          },
        ]}
      />
    </Stack>
  );
};

export default function MarketOverview({ globalSectorData }: Props) {
  const [rowData, setRowData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([]);
  const [calendarData, setCalendarData] = React.useState<
    Array<{ [key: string]: string | number }>
  >([]);
  const [SectorColumnData, setSectorColumnData] = React.useState<
    Array<{ [key: string]: any }>
  >([
    { field: "symbol", width: 50 },
    { field: "name", headerName: "Sector", width: 250, resizable: true },
    {
      field: "previous_close",
      headerName: "Last Price",
      width: 125,
      valueGetter: (params) =>
        `${(Math.round(Number(params.data.previous_close) * 100) / 100).toFixed(
          2
        )}`,
    },
    {
      field: "percent_change",
      headerName: "Change %",
      width: 125,
      valueGetter: (params) =>
        `${(Math.round(Number(params.data.previous_close) * 100) / 100).toFixed(
          2
        )}%`,
    },
    {
      field: "average_volume",
      headerName: "Volume",
      width: 125,
      valueGetter: (params) => millify(params.data.average_volume),
    },
    {
      field: "fifty_two_week.range",
      headerName: "52w Range",
      width: 250,
      resizable: true,
      cellRenderer: (params) => get52WRange(params),
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
        sx={{ overflow: "hidden" }}
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
        <Grid
          sx={{
            height: "40vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          item
          xs={12}
          md={6}
        >
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
