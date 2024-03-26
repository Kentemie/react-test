import axios from 'axios';
import { LogoList, StockData } from '../../config/api';
import { topTwelveTickers } from '../../config/data';
import { useContext, useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';
import { StockContext } from '../../features/StockContext';
import { LinearProgress } from '@mui/material';

function Carousel() {

  const [StockLogos, setStockLogos] = useState({});
  const [StockInfo, setStockInfo] = useState({});

  const { bannerLoading, setBannerLoading } = useContext(StockContext);
  
  useEffect(() => {
    console.log("Carousel`s useEffect was called!");
    const fetchStockLogos = async (tickers) => {
      const responses = [];

      for (const ticker of tickers) {
        responses.push(await axios.get(LogoList(ticker), {
          params: {
            token: process.env.REACT_APP_TOKEN
          }
        }));
      }
      const logosData = {};

      responses.forEach((response, index) => {
        const ticker = tickers[index];
        logosData[ticker] = response.data.url;
      });

      setStockLogos(logosData);
    };

    const fetchStockInfo = async (tickers) => {
      const responses = [];
      for (const ticker of tickers) {
        responses.push(await axios.get(StockData(ticker), {
          params: {
            token: process.env.REACT_APP_TOKEN
          }
        }));
      }
      const stocksData = {};

      responses.forEach((response, index) => {
        const ticker = tickers[index];
        stocksData[ticker] = {
          latestPrice: response.data[0].latestPrice,
          change: response.data[0].change,
          changePercent: response.data[0].changePercent,
          companyName: response.data[0].companyName,
        };
      });

      setStockInfo(stocksData);
    };

    const fetchFullData = async () => {
      setBannerLoading(true);
      await fetchStockLogos(topTwelveTickers);
      await fetchStockInfo(topTwelveTickers);
      setBannerLoading(false);
    };
    
    const fetchPartialData = async () => {
        setBannerLoading(true);
        await fetchStockInfo(topTwelveTickers);
        setBannerLoading(false);
    };

    fetchFullData();
    
    const interval = setInterval(() => {
      fetchPartialData();
    }, 3600000);

    return () => clearInterval(interval);

  }, [setBannerLoading])

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items = topTwelveTickers.map((ticker) => {
    const profit = StockInfo[ticker]?.changePercent >= 0;

    return (
      <Link style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }} to={ `/stock/${ticker}/` }>
        <img src={ StockLogos[ticker] } alt={ ticker } height='80' style={{ marginBottom: 10, backgroundColor: 'transparent' }} />
        <span>
          { ticker }
          &nbsp;
          <span style={{
              color: profit > 0 ? "green" : "red",
              fontWeight: 500,
            }}>
            { profit && '+' }{ StockInfo[ticker]?.changePercent?.toFixed(3) }%
          </span>
        </span>
        <span style={{ 
            fontSize: 22, 
            fontWeight: 500 
          }}>
          $ { StockInfo[ticker]?.latestPrice.toFixed(3) }
        </span>
      </Link>
    );
  });

  return (
    <>
      { bannerLoading ? (
        <LinearProgress color="inherit" />
      ) : (
        <div style={{
          height: '50%',
          display: 'flex',
          alignItems: 'center'
        }}>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
        </div>
      ) }
    </>
  );
}

export default Carousel;