import './App.css';

import { Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';

function App() {
  return (
    <Container maxWidth={ false } sx={{
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    }}>
      <Header />
      <Routes>
        <Route path='/' Component={ HomePage } />
        <Route path='/stock/:symbol' Component={ StockPage } />
      </Routes>
    </Container >
  );
}

export default App;
