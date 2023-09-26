import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import React, { useCallback, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import startOfWeek from "date-fns/startOfWeek";
import subDays from "date-fns/subDays";
import addWeeks from "date-fns/addWeeks";
import subWeeks from "date-fns/subWeeks";
import nextMonday from "date-fns/nextMonday";
import nextFriday from "date-fns/nextFriday";
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

const today = new Date();

export default function EarningsCalendar({}: Props) {
  const [weekStart, setWeekStart] = React.useState<string>("");
  const [dateRange, setDateRange] = React.useState<string>("");

  useEffect(() => {
    const temp = subDays(startOfWeek(today), 2);
    console.log(temp.toDateString());
    console.log(nextMonday(temp).getDate());
    console.log(nextFriday(temp).getDate());
    setDateRange(
      `${months[temp.getMonth()]} ${nextMonday(temp).getDate()} - ${nextFriday(
        temp
      ).getDate()}`
    );
    setWeekStart(temp.toDateString());
  }, []);

  console.log(weekStart);
  const AddWeek = useCallback(() => {
    console.log("triggering");
    setWeekStart((prev) => addWeeks(new Date(prev), 1).toDateString());
  }, []);

  const DecWeek = useCallback(() => {
    console.log("triggering");
    setWeekStart((prev) => subWeeks(new Date(prev), 1).toDateString());
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
                {getNextDayOfTheWeek(
                  val,
                  true,
                  new Date(weekStart)
                ).toDateString()}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
