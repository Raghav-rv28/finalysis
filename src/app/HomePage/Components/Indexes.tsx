"use client";
import Grid from "@mui/material/Grid";
import { Sparklines, SparklinesLine } from "react-sparklines-typescript";
export default function Indexes() {
  return (
    <div>
      <Grid container>
        <Grid item>
          <Sparklines data={[5, 10, 5, 20]}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </Grid>
      </Grid>
    </div>
  );
}
