"use client";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import data from "../../../app/api/data/global/topmovers.json";
import millify from "millify";
import React from "react";
import { useRouter } from "next/navigation";

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
interface Props {
  data: any;
}
export default function TopMovers({ data: d }: Props) {
  const { data } = d;
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const router = useRouter();
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <Box>
      {/* TOP GAINERS */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          sx={{ backgroundColor: "primary.main" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="secondary">Top Gainers</Typography>
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
                  <StyledTableCell align="left">Float</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.top_gainers.map((row) => (
                  <TableRow
                    onClick={() => router.push(`/stocks/${row.ticker}`)}
                    key={row.ticker}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.ticker}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.change_percentage}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {millify(Number(row.volume))}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* TOP LOSERS */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          sx={{ backgroundColor: "primary.main" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="secondary">Top Losers</Typography>
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
                  <StyledTableCell
                    sx={{ color: "secondary.main" }}
                    align="left"
                  >
                    Price
                  </StyledTableCell>
                  <StyledTableCell align="left">Change %</StyledTableCell>
                  <StyledTableCell align="left">Float</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.top_losers.map((row) => (
                  <TableRow
                    onClick={() => router.push(`/stocks/${row.ticker}`)}
                    key={row.ticker}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.ticker}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.change_percentage}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {millify(Number(row.volume))}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* ACTIVELY TRADED  */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          sx={{ backgroundColor: "primary.main" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography color="secondary">Top Volume Gainers</Typography>
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
                  <StyledTableCell align="left">Float</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.most_actively_traded.map((row) => (
                  <TableRow
                    onClick={() => router.push(`/stocks/${row.ticker}`)}
                    key={row.ticker}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.ticker}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.price}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.change_percentage}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {millify(Number(row.volume))}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
