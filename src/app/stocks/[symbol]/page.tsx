"use server";

import { Button, Container, Grid } from "@mui/material";
import { getStockData } from "../../../lib/functions/getStockData";

export default async function Page({ params }: { params: { symbol: string } }) {
  const data = [];
  // await getStockData(params.symbol);
  console.log(data);
  return (
    <div>
      <Container>
        {/* TOP INTRO SECTION */}
        <Grid>
          {params.symbol}
          <Button></Button>
          {JSON.stringify(data)}
        </Grid>

        {/* CHART */}
      </Container>
    </div>
  );
}
