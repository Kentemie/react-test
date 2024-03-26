import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { StockContext } from "../features/StockContext";
import { StockData } from "../config/api";
import { 
  CircularProgress, 
  Container, 
  Pagination, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  ThemeProvider, 
  Typography, 
  createTheme 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../utils/convertNumber";


function StocksTable() {

  const [page, setPage] = useState(1);
  const [currInfo, setCurrInfo] = useState([]);

  const { tickers, tableLoading, setTableLoading } = useContext(StockContext);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark'
    },
  });

  const navigate = useNavigate();

  useEffect(() => {

    const fetchStockInfo = async () => {
      const responses = []
      
      for (let i = (page - 1) * 10; i < (page - 1) * 10 + 10; ++i) {
        responses.push(await axios.get(StockData(tickers[i]), {
          params: {
            token: process.env.REACT_APP_TOKEN
          }
        }));
      }

      const data = []
      
      responses.forEach((response, index) => {
        const ticker = tickers[(page - 1) * 10 + index];
        data.push({
          ticker: ticker,
          latestPrice: response?.data[0]?.latestPrice,
          change: response?.data[0]?.change,
          changePercent: response?.data[0]?.changePercent,
          companyName: response?.data[0]?.companyName,
          marketCap: response?.data[0]?.marketCap
        });
      });

      setCurrInfo(data);
    };

    const fetchData = async () => {
      setTableLoading(true);
      await fetchStockInfo();
      setTableLoading(false);
    };
    
    fetchData();
    
  }, [tickers, page, setTableLoading]);

  return (
    <ThemeProvider theme={ darkTheme }>
      <Container maxWidth={ false } style={{ textAlign: 'center' }}>
        <Typography variant='h4' style={{ margin: 18, fontFamily: "Montserrat" }}>
          Stock Prices by Market Cap
        </Typography>
        <TableContainer>
          { tableLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: 'cyan' }}>
                <TableRow>
                { ["Stock", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Stock" ? "inherit" : "right"}
                    >
                      {head}
                    </TableCell>
                  )) }
                </TableRow>
              </TableHead>
              <TableBody>
                { currInfo.map((row) => {
                  const profit = row.changePercent >= 0;

                  return (
                    <TableRow
                      onClick={ () => navigate(`/stock/${row.ticker}`) }  
                      style={{
                        backgroundColor: "#16171a",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#131111",
                        },
                        fontFamily: "Montserrat",
                      }}
                      key={ row.ticker }
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{
                          display: 'flex',
                          gap: 15,

                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              { row.ticker }
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              { row.companyName }
                            </span>
                          </div>
                      </TableCell>
                      <TableCell align="right">
                        { row.latestPrice ? `$ ${row.latestPrice.toFixed(2)}` : "No current information" }
                      </TableCell>
                      { row.changePercent ? (
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "green" : "red",
                            fontWeight: 500,
                          }}
                        >
                          { profit && "+" }
                          { row.changePercent.toFixed(2) }%
                        </TableCell>
                      ) : (
                        <TableCell 
                          align="right"
                          style={{ fontWeight: 500 }}
                        >
                          No current information
                        </TableCell>
                      ) }
                      { row.marketCap ? (
                        <TableCell align="right">
                          {"$ "}
                          { numberWithCommas(
                            row.marketCap.toString().slice(0, -6)
                          ) }
                          M
                        </TableCell>
                      ) : (
                        <TableCell 
                          align="right"
                          style={{ fontWeight: 500 }}
                        >
                          No current information
                        </TableCell>
                      ) }
                    </TableRow>
                  )
                }) }
              </TableBody>
            </Table>
          ) }
        </TableContainer>
        <Pagination
          count={ +(tickers?.length / 10).toFixed(0) } 
          style={{
            padding: 20,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          color='primary'
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default StocksTable;