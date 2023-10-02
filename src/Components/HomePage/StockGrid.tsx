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
      <Paper sx={{ p: "1rem", ml: "1rem", overflow: "scroll", maxHeight: 200 }}>
        <Grid container direction="column">
          <Grid item>
            <ButtonGroup color="secondary" variant="text">
              <Button>US</Button>
              <Button>Commodities</Button>
              <Button>Forex</Button>
              <Button>Economy</Button>
            </ButtonGroup>
          </Grid>
          <Grid item>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  {Object.values(data).map((row) => (
                    <TableRow
                      key={row.symbol}
                      sx={{
                        "&:last-child td, &:first-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{row.symbol}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: row.close.includes("-") ? "red" : "green",
                        }}
                      >
                        {(Math.round(Number(row.close) * 100) / 100).toFixed(2)}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: row.change.includes("-") ? "red" : "green",
                        }}
                        align="right"
                      >
                        {(Math.round(Number(row.change) * 100) / 100).toFixed(
                          2
                        )}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: row.percent_change.includes("-")
                            ? "red"
                            : "green",
                        }}
                        align="right"
                      >
                        {(
                          Math.round(Number(row.percent_change) * 100) / 100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
