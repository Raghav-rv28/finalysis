"use client";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useRef } from "react";
import SampleCoinData from "../../app/api/data/samplecoindata.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import millify from "millify";
import { Sparklines, SparklinesLine } from "react-sparklines-typescript";

export default function CryptoCurrency() {
  const [rowData, setRowData] = useState<any>(SampleCoinData.data.coins);
  const theme = useTheme();
  const defaultColDefs = { resizable: true };
  const gridRef = useRef<any>(null);
  const getCryptoName = (params) => (
    <Box>
      <img
        src={params.data.iconUrl}
        style={{
          maxWidth: 24,
          maxHeight: 24,
          transform: "translateY(5px)",
        }}
      />
      <Typography sx={{ marginLeft: "1rem" }} component="span">
        {params.value}
      </Typography>
      <Typography
        sx={{ marginLeft: "1rem" }}
        component="span"
        variant="subtitle2"
      >
        {params.data.symbol}
      </Typography>
    </Box>
  );
  const sparklineGenerator = (params) => (
    <Sparklines data={params.value}>
      <SparklinesLine
        color={params.data.change.includes("-") ? "#f00" : "#0f0"}
      />
    </Sparklines>
  );
  const [columnData, setColumnData] = useState<Array<any>>([
    { field: "rank", width: 25, headerName: "# Rank" },
    {
      field: "name",
      cellRenderer: getCryptoName,
    },
    {
      field: "price",
      valueFormatter: (params: { value: number }) =>
        Math.round(params.value * 100000) / 100000,
    },
    {
      field: "change",
      valueFormatter: (params) => `${params.value} %`,
    },
    {
      field: "marketCap",
      valueFormatter: (params: { value: number }) => millify(params.value),
    },
    {
      field: "24hVolume",
      valueFormatter: (params: { value: number }) => millify(params.value),
    },
    {
      field: "sparkline",
      cellRenderer: sparklineGenerator,
      resizable: false,
      suppressSizeToFit: true,
    },
  ]);

  const onGridReady = () => {
    console.log(gridRef);
    if (gridRef.current !== undefined && gridRef.current !== null) {
      gridRef.current.api.sizeColumnsToFit();
    }
  };

  return (
    <div
      className={
        theme.palette.mode === "dark"
          ? "ag-theme-alpine-dark"
          : "ag-theme-alpine"
      }
      style={{ width: "100%", height: "70vh" }}
    >
      <AgGridReact
        ref={gridRef}
        onGridReady={onGridReady}
        rowData={rowData}
        defaultColDef={defaultColDefs}
        columnDefs={columnData}
      />
    </div>
  );
}
