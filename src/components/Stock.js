import { useState } from 'react';
import { StockContext } from '../features/StockContext';
import { defaultUSTickers } from '../config/data';

function Stock({ children }) {
  
  const [region, setRegion] = useState('US');
  const [tickers, setTickers] = useState(defaultUSTickers);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  return (
    <StockContext.Provider value={{ 
      region, 
      tickers,
      bannerLoading, 
      tableLoading,
      setRegion,
      setTickers, 
      setBannerLoading, 
      setTableLoading 
    }}>
      { children }
    </StockContext.Provider>
  );
}

export default Stock;