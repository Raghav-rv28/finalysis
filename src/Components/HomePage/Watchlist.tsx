"use client";
import React from "react";
import { useRouter } from "next/navigation";
import millify from "millify";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = { watchlist: Array<any> };

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.secondary.main,
  },
  [`&.${tableCellClasses.body}`]: {
    color: theme.palette.secondary.main,
    fontSize: 14,
    cursor: "pointer",
    ":hover": { fontWeight: 700 },
  },
}));

export default function Watchlist({ watchlist }: Props) {
  const [expanded, setExpanded] = React.useState<boolean>(true);

  const router = useRouter();
  const handleChange = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary
          sx={{ backgroundColor: "primary.main" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="secondary">WatchList</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "primary.main" }}>
          <TableContainer component={Paper}>
            <Table
              sx={{ backgroundColor: "primary.main" }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Symbol</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Change %</StyledTableCell>
                  <StyledTableCell align="left">Avg Volume</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {watchlist.map((row) => (
                  <TableRow
                    onClick={() => router.push(`/stocks/${row.symbol}`)}
                    key={row.symbol}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.symbol}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.close}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.percent_change}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {millify(Number(row.average_volume))}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
