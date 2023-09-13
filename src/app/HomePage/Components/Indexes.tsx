"use client";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Sparklines, SparklinesLine } from "react-sparklines-typescript";

export default function Indexes({ indexes }) {
  return (
    <Grid container>
      <Grid item sx={{ width: 350, height: 350 }}>
        <Sparklines
          data={[5, 10, 5, 20, 25, 30]}
          width={100}
          height={25}
          margin={5}
        >
          <SparklinesLine />
        </Sparklines>
      </Grid>
      <Grid item>
        {indexes.map((index: string) => {
          return (
            <Typography sx={{ color: "primary" }} key={index}>
              {index}
            </Typography>
          );
        })}
      </Grid>
    </Grid>
  );
}
