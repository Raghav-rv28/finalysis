import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import React, { useCallback, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import startOfWeek from "date-fns/startOfWeek";
import subDays from "date-fns/subDays";
import addWeeks from "date-fns/addWeeks";
import subWeeks from "date-fns/subWeeks";
import nextMonday from "date-fns/nextMonday";
import nextFriday from "date-fns/nextFriday";
import data from "../../app/api/data/global/earnings.json";
import isSameDay from "date-fns/isSameDay";
import { addBusinessDays, subBusinessDays } from "date-fns";
import millify from "millify";
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

function getNextDayOfTheWeek(
  dayName,
  excludeToday = true,
  refDate = new Date()
) {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(
    refDate.getDate() +
      +!!excludeToday +
      ((dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7)
  );
  return refDate;
}

function StockListEarnings({ data }: StockListEarningsProps) {
  return (
    <Grid
      sx={{ overflow: "hidden" }}
      padding="1rem"
      container
      direction="row"
      justifyContent="center"
      alignItems="flex-start"
    >
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
    </Grid>
  );
}

const today = new Date();

export default function EarningsCalendar({}: Props) {
  const [weekStart, setWeekStart] = React.useState<string>("");
  // Date Range Text is for the Weekly
  const [dateRange, setDateRange] = React.useState<string>("");
  // for Daily Component
  const [dateSelected, setDateSelected] = React.useState<string>("");
  const [showEPSEstimate, setShowEPSEstimate] = React.useState<boolean>(false);

  useEffect(() => {
    const temp = startOfWeek(today);
    setDateRange(
      `${months[temp.getMonth()]} ${nextMonday(temp).getDate()} - ${nextFriday(
        temp
      ).getDate()}`
    );
    setWeekStart(temp.toDateString());
    setDateSelected(today.toDateString());
  }, []);

  useEffect(() => {
    const temp = new Date(weekStart);
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
  }, [weekStart]);

  const AddWeek = useCallback(() => {
    console.log("triggering");
    setWeekStart((prev) => addWeeks(new Date(prev), 1).toDateString());
  }, []);

  const AddBDay = useCallback(() => {
    console.log("triggering");
    setDateSelected((prev) =>
      addBusinessDays(new Date(prev), 1).toDateString()
    );
  }, []);
  const DecBDay = useCallback(() => {
    console.log("triggering");
    setDateSelected((prev) =>
      subBusinessDays(new Date(prev), 1).toDateString()
    );
  }, []);

  const DecWeek = useCallback(() => {
    console.log("triggering");
    setWeekStart((prev) => subWeeks(new Date(prev), 1).toDateString());
  }, []);

  return (
    <div>
      {weekStart}
      <Typography
        color="secondary"
        variant="h5"
        align="center"
        sx={{ width: "100%" }}
      >
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
      <Grid
        container
        justifyContent="center"
        alignItems="flex-start"
        columns={10}
      >
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((val) => {
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
        })}
        {["mon", "tue", "wed", "thu", "fri"].map((val) => {
          return (
            <Grid
              height="50vh"
              sx={
                isSameDay(
                  new Date(),
                  getNextDayOfTheWeek(val, true, new Date(weekStart))
                )
                  ? {
                      backgroundColor: "rgba(255, 237, 160,0.25)",
                    }
                  : {
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
              <StockListEarnings
                data={data.earningsCalendar.filter((value) =>
                  isSameDay(
                    new Date(value.date),
                    getNextDayOfTheWeek(val, true, new Date(weekStart))
                  )
                )}
              />
            </Grid>
          );
        })}
      </Grid>
      {/* DAILY DESIGN */}
      <Box
        m="auto"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <IconButton onClick={() => DecBDay()}>
          <ArrowLeft />
        </IconButton>
        <Typography
          color="secondary"
          sx={{ width: "200", p: "1rem" }}
          variant="h6"
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
          minWidth: 350,
        }}
      >
        <List sx={{ width: "80%" }}>
          {data.earningsCalendar
            .filter((value) =>
              isSameDay(
                new Date(value.date),
                getNextDayOfTheWeek(dateSelected, true, new Date(weekStart))
              )
            )
            .map((val) => {
              if (val.epsEstimate !== null || showEPSEstimate) {
                return (
                  <ListItem
                    sx={{
                      width: "100%",
                      borderRadius: "2%",
                      border: 2,
                      borderColor: "secondary.main",
                    }}
                    key={val.symbol}
                  >
                    <Grid
                      container
                      sx={{ width: "100%" }}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item md>
                        <Typography component="span">{val.symbol}</Typography>
                      </Grid>
                      <Grid item>
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
                      <Grid item>
                        <Typography>{val.quarter}</Typography>
                      </Grid>
                      <Grid item>
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
    </div>
  );
}
