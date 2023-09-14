"use client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useCallback } from "react";
import AreaChart from "./AreaChart";
import { nanoid } from "nanoid";
export default function Indexes({ indexes }) {
  const getCard = useCallback(
    (options: any, index: any) => {
      console.log("testing");
      return (
        <Grid key={nanoid()} item sm={5} md={4} lg={2.4}>
          <Card
            key={nanoid()}
            sx={{ backgroundColor: "inherit", display: "flex" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {index.ticker}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="span"
                >
                  {index.name}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ marginLeft: "0.3rem" }}
                  color={
                    index.priceChange.includes("-") ? "#ff0000" : "#00ff00"
                  }
                  component="span"
                >
                  {index.price}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ marginLeft: "0.3rem" }}
                  color={
                    index.priceChange.includes("-") ? "#ff0000" : "#00ff00"
                  }
                  component="span"
                >
                  {index.priceChange}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  pb: 1,
                }}
              >
                <AreaChart options={options} />
              </Box>
            </Box>
          </Card>
        </Grid>
      );
    },
    [indexes]
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={{ lg: 0.4, md: 1, sm: 2 }}
      rowSpacing={3}
    >
      {indexes.map((index: string) => {
        const options = {
          responsive: true,
          animation: false,
          plugins: {
            legend: {
              rtl: true,
              labels: {
                font: {
                  size: 14,
                },
              },
            },
          },
        };
        return getCard(options, index);
      })}
      <Grid item></Grid>
    </Grid>
  );
}
