import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import data from "../../app/api/data/global/indexquote.json";
type Props = {};

export default function StockGrid({}: Props) {
  return (
    <div>
      <Grid
        p="1rem"
        sx={{ backgroundColor: "primary.main" }}
        container
        direction="column"
      >
        <Grid item>
          <ButtonGroup color="secondary" variant="text">
            <Button>US</Button>
            <Button>Commodities</Button>
            <Button>Forex</Button>
            <Button>Economy</Button>
          </ButtonGroup>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {Object.values(data).map((row) => (
                  <TableRow
                    key={row.symbol}
                    sx={{ "&:last-child td, &:first-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{row.close}</TableCell>
                    <TableCell align="right">{row.change}</TableCell>
                    <TableCell align="right">{row.percent_change}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
