import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

type Props = {};

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

function lastSunday(): Date {
  var d = new Date();
  console.log(d.toDateString());
  d.setDate(d.getDate() - d.getDay() - 1);
  console.log(d.toDateString());
  return d;
}

export default function EarningsCalendar({}: Props) {
  const [weekStart, setWeekStart] = React.useState<Date>(new Date());
  const [dateRange, setDateRange] = React.useState<string>("");

  useEffect(() => {
    setWeekStart(lastSunday());
  }, []);
  useEffect(() => {
    console.log(getNextDayOfTheWeek("mon", false, weekStart).toDateString());
    setDateRange(
      `${months[weekStart.getMonth()]} ${getNextDayOfTheWeek(
        "mon",
        true,
        weekStart
      ).getDate()} - ${getNextDayOfTheWeek(
        "friday",
        true,
        weekStart
      ).getDate()}`
    );
  }, [weekStart]);

  const AddWeek = useCallback(() => {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() + 7)));
  }, []);

  const DecWeek = useCallback(() => {
    setWeekStart(new Date(weekStart.setDate(weekStart.getDate() - 7)));
  }, []);

  return (
    <div>
      <Typography variant="h5" align="center" sx={{ width: "100%" }}>
        Most Important Earnings Releases
      </Typography>
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
        <Typography sx={{ width: "200", p: "1rem" }} variant="h6">
          {dateRange}
        </Typography>
        <IconButton onClick={() => AddWeek()}>
          <ArrowRight />
        </IconButton>
      </Box>
      <Grid container columns={10}>
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
              <Typography sx={{ width: "100%" }} align="center">
                {val}
              </Typography>
            </Grid>
          );
        })}
        {["mon", "tue", "wed", "thu", "fri"].map((val) => {
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
              <Typography sx={{ width: "100%" }} align="center">
                {getNextDayOfTheWeek(val, true, weekStart).toDateString()}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
