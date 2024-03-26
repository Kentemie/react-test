import { CircularProgress, ThemeProvider, createTheme, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { chartRange } from "../config/data";
import SelectButton from "./SelectButton";

function StockInfo( {symbol} ) {
  const [historicalData, setHistoricalData] = useState([]);
  const [range, setRange] = useState('1m');


  const Container = styled('div')(({ theme }) => ({
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  }));

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const { data } = await axios.get(HistoricalChart(symbol), {
        params: {
          token: process.env.REACT_APP_TOKEN,
          range: range
        }
      });

      setHistoricalData(data);
    };

    fetchHistoricalData();
  }, [range, symbol]);

  return (
    <ThemeProvider theme={ darkTheme }>
      <Container>
        { !historicalData ? (
          <CircularProgress style={{ color: 'cyan' }} size={ 250 } thickness={ 1 } />
        ) : (
          <>
            <Line 
              data={{
                labels: historicalData.map((stock) => {
                  return new Date(stock.priceDate).toLocaleDateString()
                }),
                datasets: [{
                  data: historicalData.map(stock => stock.fclose),
                  label: `Price ( Past ${range} ) in USD.`,
                  borderColor: 'cyan'
                }]
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              { chartRange.map((chRange) => (
                <SelectButton
                  key={ chRange.value }
                  onClick={() => {
                    setRange(chRange.value);
                  }}
                  selected={ chRange.value === range }
                >
                  { chRange.label }
                </SelectButton>
              ))}
            </div>
          </>
        ) }
      </Container>
    </ThemeProvider>
  );
}

export default StockInfo;