import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import React, { useCallback, useEffect } from "react";
import { Day, getDay, isSunday, nextDay, previousDay, setDay } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import nextMonday from "date-fns/nextMonday";
import nextFriday from "date-fns/nextFriday";
import data from "../../../app/api/data/global/earnings.json";
import isSameDay from "date-fns/isSameDay";
import { addBusinessDays, subBusinessDays } from "date-fns";
import millify from "millify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
type Props = {};
type StockListEarningsProps = { data: Array<any> };
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function StockListEarnings({ data }: StockListEarningsProps) {
  console.log(data);
  return (
    <Grid
      sx={{ overflow: "hidden" }}
      padding="1rem"
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
      {data.length === 0 ? (
        <Grid item xs={12}>
          <Typography
            mt="1rem"
            variant="h4"
            color="secondary"
            textAlign="center"
            sx={{ width: "100%" }}
          >
            {" "}
            NO DATA!
          </Typography>
        </Grid>
      ) : (
        <>
          <Grid item md={5}>
            <Typography color="secondary" fontSize={12} pt="1rem" pb="1rem">
              <LightMode style={{ verticalAlign: "middle" }} />
              Before Open
            </Typography>
            <Stack justifyContent="center" alignItems="center">
              {data.map((value) => {
                if (value.hour === "bmo") {
                  return (
                    <Typography color="secondary" key={value.symbol}>
                      {value.symbol}
                    </Typography>
                  );
                }
              })}
            </Stack>
          </Grid>
          <Grid item md={5}>
            <Typography
              color="secondary"
              fontSize={12}
              pt="1rem"
              pb="1rem"
              align="center"
            >
              <DarkMode style={{ verticalAlign: "middle" }} />
              After Close
            </Typography>
            <Stack justifyContent="center" alignItems="center">
              {data.map((value) => {
                if (value.hour === "amc") {
                  return (
                    <Typography color="secondary" key={value.symbol}>
                      {value.symbol}
                    </Typography>
                  );
                }
              })}
            </Stack>
          </Grid>
        </>
      )}
    </Grid>
  );
}

const today = new Date();

export default function EarningsCalendar({}: Props) {
  // Date Range Text is for the Weekly
  const [dateRange, setDateRange] = React.useState<string>("");
  // for Daily Component
  const [dateSelected, setDateSelected] = React.useState<string | undefined>();
  const [showEPSEstimate, setShowEPSEstimate] = React.useState<boolean>(false);

  const theme = useTheme();
  const lessThanLarge = useMediaQuery(theme.breakpoints.down("lg"));

  useEffect(() => {
    setDateSelected(today.toDateString());
    // get current's week monday and friday.
    const weekStart = setDay(today, 0);
    setDateRange(
      `${months[nextMonday(weekStart).getMonth()]} ${nextMonday(
        weekStart
      ).getDate()} - ${months[nextFriday(weekStart).getMonth()]} ${nextFriday(
        weekStart
      ).getDate()}`
    );
  }, []);

  useEffect(() => {
    const temp = setDay(new Date(dateSelected), 0);
    if (nextMonday(temp).getMonth() === nextFriday(temp).getMonth()) {
      setDateRange(
        `${months[nextMonday(temp).getMonth()]} ${nextMonday(
          temp
        ).getDate()} - ${nextFriday(temp).getDate()}`
      );
    } else {
      setDateRange(
        `${months[nextMonday(temp).getMonth()]} ${nextMonday(
          temp
        ).getDate()} - ${months[nextFriday(temp).getMonth()]} ${nextFriday(
          temp
        ).getDate()}`
      );
    }
  }, [dateSelected]);

  const AddWeek = useCallback(() => {
    setDateSelected((prev) =>
      addBusinessDays(new Date(prev), 5).toDateString()
    );
  }, []);

  const AddBDay = useCallback(() => {
    setDateSelected((prev) =>
      addBusinessDays(new Date(prev), 1).toDateString()
    );
  }, []);
  const DecBDay = useCallback(() => {
    setDateSelected((prev) =>
      subBusinessDays(new Date(prev), 1).toDateString()
    );
  }, []);

  const DecWeek = useCallback(() => {
    setDateSelected((prev) =>
      subBusinessDays(new Date(prev), 5).toDateString()
    );
  }, []);

  return (
    <div>
      <Paper variant="outlined" sx={{ p: "1rem", backgroundColor: "inherit" }}>
        <Typography color="secondary" variant="h5" align="center">
          Most Important Earnings Releases
        </Typography>
        {/* WEEKLY DESIGN */}
        <Box
          m="auto"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <IconButton onClick={() => DecWeek()}>
            <ArrowLeft />
          </IconButton>
          <Typography
            color="secondary"
            sx={{ width: "200", p: "1rem" }}
            variant="h6"
          >
            {dateRange}
          </Typography>
          <IconButton onClick={() => AddWeek()}>
            <ArrowRight />
          </IconButton>
        </Box>
        {!lessThanLarge && (
          <Grid
            sx={{ width: "100%" }}
            container
            direction="row"
            columns={10}
            justifyContent="center"
          >
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (val) => {
                return (
                  <Grid
                    key={val}
                    sx={{
                      border: 1,
                      borderColor: "secondary.main",
                    }}
                    item
                    lg={2}
                  >
                    <Typography
                      color="secondary"
                      sx={{ width: "100%" }}
                      align="center"
                    >
                      {val}
                    </Typography>
                  </Grid>
                );
              }
            )}
          </Grid>
        )}
        <Grid
          sx={{ width: "100%" }}
          container
          justifyContent="center"
          alignItems={{ md: "flex-start", lg: "center" }}
          columns={10}
        >
          {dateSelected &&
            [1, 2, 3, 4, 5].map((val: number) => {
              const date = new Date(dateSelected);
              const currentDay = getDay(date);

              const getDateForWeekDay =
                val !== currentDay
                  ? currentDay > val
                    ? previousDay(date, val)
                    : nextDay(date, val as Day)
                  : date;
              return (
                <Grid
                  height={{ lg: "50vh", md: "auto" }}
                  sx={
                    val === currentDay
                      ? {
                          overflow: "scroll",
                          backgroundColor: "rgba(255, 237, 160,0.25)",
                        }
                      : {
                          overflow: "scroll",
                          border: 1,
                          borderColor: "secondary.main",
                          "&:hover": {
                            backgroundColor: "rgba(255, 237, 160,0.25)",
                          },
                        }
                  }
                  key={val}
                  item
                  lg={2}
                  md={6}
                >
                  {![0, 6].includes(currentDay) && (
                    <StockListEarnings
                      data={data.earningsCalendar.filter((value) => {
                        // if (isSameDay(new Date(value.date), getDateForWeekDay)) {

                        // }
                        return isSameDay(
                          new Date(value.date),
                          getDateForWeekDay
                        );
                      })}
                    />
                  )}
                </Grid>
              );
            })}
        </Grid>
        {/* DAILY DESIGN */}
        <Box
          m="auto"
          mt="1rem"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => DecBDay()}>
            <ArrowLeft />
          </IconButton>
          <Typography
            color="secondary"
            sx={{ width: "200", p: "1rem" }}
            variant="h5"
          >
            {dateSelected}
          </Typography>
          <IconButton onClick={() => AddBDay()}>
            <ArrowRight />
          </IconButton>
        </Box>
        <Box
          m="1rem"
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minWidth: 350,
          }}
        >
          <List sx={{ width: "80%" }}>
            <ListItem>
              <Grid
                container
                sx={{ width: "100%" }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Grid item xs={3}>
                  <Typography component="span">SYMBOL</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography component="span">EPS EST.</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>QUARTER</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>REVENUE EST.</Typography>
                </Grid>
              </Grid>
            </ListItem>
            {data.earningsCalendar
              .filter((value) =>
                isSameDay(new Date(value.date), new Date(dateSelected))
              )
              .map((val) => {
                if (val.epsEstimate !== null || showEPSEstimate) {
                  return (
                    <ListItem
                      sx={{
                        borderRadius: "2%",
                        border: 2,
                        borderColor: "secondary.main",
                      }}
                      key={val.symbol}
                    >
                      <Grid
                        spacing={1}
                        container
                        sx={{ width: "100%" }}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item xs={4}>
                          <Typography component="span">{val.symbol}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            component="span"
                            sx={{
                              fontWeight: 600,
                              color: String(val.epsEstimate).includes("-")
                                ? "red"
                                : "lightgreen",
                            }}
                          >
                            {val.epsEstimate}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>{val.quarter}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography>{`${
                            val.revenueEstimate !== null
                              ? millify(val.revenueEstimate)
                              : "-"
                          }`}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                }
              })}
          </List>
        </Box>
      </Paper>
    </div>
  );
}
