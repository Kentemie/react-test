import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';


function Banner() {
  return (
    <div style={{
      backgroundImage: 'url(./stocks.jpg)',
    }}>
      <Container maxWidth={ false } sx={{
        height: 450,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        justifyContent: 'space-around',
      }}>
        <div style={{
          display: 'flex',
          height: '20%',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
          <Typography
              variant='h2'
              style={{
                fontWeight: 'bold',
                marginBottom: 15,
                fontFamily: 'Montserrat',
              }}
            >
              What do you call a pile of cats?
            </Typography>
            <Typography
              variant='subtitle2'
              style={{
                color: 'darkgrey',
                textTransform: 'capitalize',
                fontFamily: 'Montserrat',
              }}
            >
              A meow-ntain.
            </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;