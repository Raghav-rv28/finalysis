"use client";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect } from "react";
import chartData from "../../app/api/data/chartdata.json";
import { Sparklines, SparklinesBars } from "react-sparklines-typescript";
export default function Indexes({ indexes }) {
  const getCard = useCallback((index: any) => {
    return (
      <Grid key={crypto.randomUUID()} item sm={5} md={4} lg={2.4}>
        <Card
          key={crypto.randomUUID()}
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
                color={index.priceChange.includes("-") ? "#ff0000" : "#00ff00"}
                component="span"
              >
                {index.price}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ marginLeft: "0.3rem" }}
                color={index.priceChange.includes("-") ? "#ff0000" : "#00ff00"}
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
              <Sparklines
                data={chartData.values.map((value: { open: string }) =>
                  Number(value.open)
                )}
              ></Sparklines>
            </Box>
          </Box>
        </Card>
      </Grid>
    );
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={{ lg: 0.4, md: 1, sm: 2 }}
      rowSpacing={3}
    >
      {indexes.map((index: string) => {
        return getCard(index);
      })}
      <Grid item></Grid>
    </Grid>
  );
}
