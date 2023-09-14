import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import data from "../../api/data/topmovers.json";
import millify from "millify";

export default function TopMovers() {
  return (
    <Box sx={{ backgroundColor: "primary.main" }}>
      {/* TOP GAINERS */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Top Gainers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Change %</TableCell>
                  <TableCell align="left">Float</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.top_gainers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ticker}
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.change_percentage}</TableCell>
                    <TableCell align="left">
                      {millify(Number(row.volume))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* TOP LOSERS */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Top Losers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Change %</TableCell>
                  <TableCell align="left">Float</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.top_losers.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ticker}
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.change_percentage}</TableCell>
                    <TableCell align="left">
                      {millify(Number(row.volume))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      {/* ACTIVELY TRADED  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Top Volume Gainers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table aria-label="simple table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Change %</TableCell>
                  <TableCell align="left">Float</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.most_actively_traded.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ticker}
                    </TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.change_percentage}</TableCell>
                    <TableCell align="left">
                      {millify(Number(row.volume))}
                    </TableCell>
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
