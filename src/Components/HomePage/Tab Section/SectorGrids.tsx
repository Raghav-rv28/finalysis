"use client";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./styles.css";
import { AgGridReact } from "ag-grid-react";
import { Typography } from "@mui/material";
import React from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";

export function SectorGrid({
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

interface Columns {
  width?: string;
  field?: string;
  headerName: string;
  valueGetter?: (params: any) => void;
}
export function CalendarGrid({
  data,
  theme,
  columnData,
}: {
  columnData: any;
  theme;
  data: any;
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
      <AgGridReact rowData={data} columnDefs={columnData} />
    </div>
  );
}
