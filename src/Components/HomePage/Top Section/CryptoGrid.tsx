import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import data from "../../../app/api/data/global/globalcoinmetrics.json";
import millify from "millify";
import { Sparklines, SparklinesLine } from "react-sparklines-typescript";
type Props = {};

export default function CryptoGrid({}: Props) {
  const [selected, setSelected] = React.useState<string>("Fear & Greed Index");
  const [chartData, setChartData] = React.useState<Array<number>>([]);

  React.useEffect(() => {
    setChartData(
      [...Array(10)].map(() => {
        return Math.floor(Math.random() * 100);
      })
    );
  }, []);
  const handleChange = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
    setChartData(
      [...Array(10)].map(() => {
        return Math.floor(Math.random() * 100);
      })
    );
  };
  return (
    <div>
      <Paper sx={{ p: "1rem", maxHeight: 200, overflow: "scroll" }}>
        <Grid container direction="row">
          <Grid item xs={6}>
            <List dense>
              <ListItem>
                <ListItemText
                  primaryTypographyProps={{ fontSize: 15, color: "secondary" }}
                  primary={`Mkt Cap: ${millify(
                    data.data.quote.USD.total_market_cap,
                    { precision: 3 }
                  )}+`}
                />
                <Typography
                  sx={{
                    color: String(
                      data.data.quote.USD
                        .total_market_cap_yesterday_percentage_change
                    ).includes("-")
                      ? "red"
                      : "green",
                  }}
                >{`${(
                  Math.round(
                    Number(
                      data.data.quote.USD
                        .total_market_cap_yesterday_percentage_change
                    ) * 100
                  ) / 100
                ).toFixed(2)} %`}</Typography>
              </ListItem>
              <ListItem>
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography color="secondary" sx={{ fontSize: 15 }}>
                    T. Exchanges:
                  </Typography>
                  <Typography
                    color="secondary"
                    sx={{ fontSize: 15, fontWeight: 700 }}
                  >
                    {data.data.active_exchanges}
                  </Typography>
                </Stack>
              </ListItem>
              <ListItem>
                <Stack
                  width="100%"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  {/* Active Pairs */}
                  <Typography color="secondary" sx={{ fontSize: 15 }}>
                    T Active Pairs:
                  </Typography>
                  <Typography
                    color="secondary"
                    sx={{ fontSize: 15, fontWeight: 700 }}
                  >
                    {millify(data.data.active_market_pairs)}+
                  </Typography>
                </Stack>
              </ListItem>
              <ListItem>
                {/* 24h Vol. */}
                <ListItemText
                  primary={`24h Vol. ${millify(
                    data.data.quote.USD.total_volume_24h
                  )}`}
                  primaryTypographyProps={{ fontSize: 15, color: "secondary" }}
                />
                <Typography
                  sx={{
                    color: String(
                      data.data.quote.USD
                        .total_volume_24h_yesterday_percentage_change
                    ).includes("-")
                      ? "red"
                      : "green",
                  }}
                >{`${(
                  Math.round(
                    Number(
                      data.data.quote.USD
                        .total_volume_24h_yesterday_percentage_change
                    ) * 100
                  ) / 100
                ).toFixed(2)} %`}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <Stack>
              <Box p={1}>
                <Select value={selected} onChange={handleChange}>
                  <MenuItem value={"Fear & Greed Index"}>
                    Fear & Greed Index
                  </MenuItem>
                  <MenuItem value={"Mkt Cap"}>Market Cap</MenuItem>
                  <MenuItem value={"24H Vol."}>24H Volume</MenuItem>
                </Select>
              </Box>
              <Sparklines data={chartData} width={200} height={100}>
                <SparklinesLine style={{ fill: "none" }} />
              </Sparklines>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
