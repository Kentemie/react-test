import { 
  AppBar, 
  Container, 
  MenuItem,
  Select, 
  ThemeProvider, 
  Toolbar, 
  Typography, 
  createTheme,
  FormControl, 
  InputLabel 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { StockContext } from '../features/StockContext';
import { Regions } from '../config/data';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RegionSymbols } from '../config/api';

function Header() {
  const [initialRender, setInitialRender] = useState(true);

  const navigate = useNavigate();
  const goToHomePage = () => navigate('/');
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      mode: 'dark'
    },
  });

  const { region, setRegion, setTickers } = useContext(StockContext);

  useEffect(() => {
    let active = true;

    const fetchTickers = async () => {
      const response = await axios.get(RegionSymbols(region), {
        params: {
          token: process.env.REACT_APP_TOKEN
        }
      });
      const tickers = [];

      response.data.forEach(element => {
        tickers.push(element.symbol);
      });

      if (active) {
        setTickers(tickers);
      }
    };
    
    if (!initialRender) {
      console.log("Hello there!");
      fetchTickers();
    } else {
      setInitialRender(false);
    }

    return () => {
      active = false;
    };

  }, [region]);

  return (
    <ThemeProvider theme={ darkTheme }>
      <AppBar color='transparent' position='static'>
        <Container maxWidth={ false }>
          <Toolbar>
            <Typography onClick={ goToHomePage } sx={{
              flex: 1,
              color: 'cyan',
              fontFamily: 'Montserrat',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Stock App
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='select-helper-label'>Regions</InputLabel>
              <Select
                labelId='select-helper-label'
                id='select-helper'
                label='Regions'
                value={ region }
                onChange={ (event) => setRegion(event.target.value) }
              >
                { Object.entries(Regions).map(([code, name]) => (
                  <MenuItem key={ code } value={ code }>
                    { name }
                  </MenuItem>
                )) }
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}


export default Header;
