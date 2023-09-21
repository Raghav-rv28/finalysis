"use server";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import stockData from "../../api/data/stock/stockfundamentals.json";
import { StarBorderOutlined } from "@mui/icons-material";
import { getStockData } from "../../../lib/functions/getStockData";
import React from "react";
import TabSection from "../../../Components/StockPage/TabSection";

export default async function Page({ params }: { params: { symbol: string } }) {
  const data = [];

  // await getStockData(params.symbol);
  console.log(data);
  return (
    <div>
      {/* TOP INTRO SECTION */}
      <Grid
        container
        sx={{
          height: "100vh",
          backgroundColor: "primary.main",
          border: "0.1rem #000",
          borderStyle: "solid none none none",
        }}
      >
        {/* artificial Padding */}
        <Grid
          sx={{ backgroundColor: "background.paper" }}
          item
          md={0}
          lg={1}
        ></Grid>
        {/* MAIN CONTENT */}
        <Grid container direction="column" item md={12} lg={10}>
          <Grid
            item
            sx={{
              padding: "2rem",
              width: "100%",
            }}
          >
            <Grid container direction="row">
              <Typography variant="h4">
                {`${stockData.Name} (${stockData.Symbol})`}{" "}
                <IconButton>
                  <StarBorderOutlined />
                </IconButton>
              </Typography>
            </Grid>
            <Typography variant="h6">{`${stockData.Exchange} - Currency in ${stockData.Currency} (${stockData.Country})`}</Typography>
            <Typography marginTop="1rem" variant="body2">
              {stockData.Description}
            </Typography>
          </Grid>
          {/* TAB SECTION */}
          <Grid
            item
            sx={{
              backgroundColor: "primary.main",
            }}
          >
            <TabSection stockData={stockData} />
          </Grid>
        </Grid>
        {/* artificial Padding */}
        <Grid
          sx={{ backgroundColor: "background.paper" }}
          item
          md={0}
          lg={1}
        ></Grid>
      </Grid>
    </div>
  );
}
