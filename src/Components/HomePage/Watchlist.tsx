"use client";
import React, { useEffect } from "react";
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
import { useSession } from "next-auth/react";
import stockData from "../../app/api/data/global/stocks.json";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SearchDialog } from "../NavBar/SearchDialog";

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
  const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
  const [data, setData] = React.useState<Array<any>>([]);
  const [expanded, setExpanded] = React.useState<boolean>(true);
  const [addOpen, setAddOpen] = React.useState<boolean>(false);
  const [listEmpty, setListEmpty] = React.useState<boolean>(
    watchlist.length === 0
  );
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const dataTemp = [];

    watchlist.forEach((value) => {
      const { close, symbol, average_volume, percent_change, change } = value;
      dataTemp.push({ close, symbol, percent_change, change, average_volume });
    });
    setData(dataTemp);
  }, []);

  const handleChange = () => {
    setExpanded((prev) => !prev);
  };
  const getSearchResults = React.useCallback((query: string) => {
    const temp: Array<any> = [];
    if (query === "") {
      setSearchResults(temp);
      return;
    }
    let counter = 10;
    stockData?.data.map((value, index) => {
      if (counter === 0) {
        return temp;
      }
      if (value.symbol.includes(query.toUpperCase())) {
        temp.push(value);
        counter -= 1;
      }
    });
    setSearchResults(temp);
  }, []);

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAdd = (value: string) => {
    console.log(value);
    if (!data.includes(value)) {
      // (async () => {
      //   await fetch(
      //     `https://i3bz0ybp1h.execute-api.us-east-2.amazonaws.com/Prod/`,
      //     {
      //       method: "POST",
      //       headers: {},
      //       body: JSON.stringify({
      //         watchlist: watchlist.map((val) => val.symbol).concat([value]),
      //       }),
      //     }
      //   );
      // })();
      setData((prev) =>
        prev.concat([
          {
            symbol: value,
            close: "434.2",
            percent_change: "2.4%",
            average_volume: 3253253253,
          },
        ])
      );
    }
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
          {session.status === "authenticated" && !listEmpty && (
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
                  {data?.map((row) => {
                    console.log(watchlist);
                    return (
                      <TableRow
                        onClick={() => router.push(`/stocks/${row.symbol}`)}
                        key={row.symbol}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {row.symbol}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.close}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.percent_change}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {millify(Number(row.average_volume))}
                        </StyledTableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {(!listEmpty || session.status === "authenticated") && (
            <Box
              sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                color="secondary"
                onClick={() => {
                  setAddOpen(true);
                }}
              >
                {session.status === "authenticated" ? "Add  +" : "Sign In"}
              </Button>
              <SearchDialog
                search={searchResults}
                getSearchResults={getSearchResults}
                open={addOpen}
                onClose={handleAddClose}
                watchListData={watchlist}
                handleAdd={handleAdd}
              />
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
