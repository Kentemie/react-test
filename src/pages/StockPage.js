import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CompanyInfo, LogoList, StockData } from "../config/api";
import { LinearProgress, Typography, styled } from "@mui/material";
import StockInfo from '../components/StockInfo';

function StockPage() {
  const { symbol } = useParams();
  const [stockInfo, setStockInfo] = useState({});
  const [stockLogo, setStockLogo] = useState('');
  const [companyInfo, setCompanyInfo] = useState({});
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    
    const fetchStockInfo = async () => {
      const { data } = await axios.get(StockData(symbol), {
        params: {
          token: process.env.REACT_APP_TOKEN
        }
      });
      setStockInfo(data[0]);
    };
    
    const fetchStockLogo = async () => {
      const { data } = await axios.get(LogoList(symbol), {
        params: {
          token: process.env.REACT_APP_TOKEN
        }
      });
      setStockLogo(data.url);
    };

    const fetchCompanyInfo = async () => {
      const { data } = await axios.get(CompanyInfo(symbol), {
        params: {
          token: process.env.REACT_APP_TOKEN
        }
      });
      setCompanyInfo(data[0]);
    };
    
    const fetchData = async () => {
      setLoading(true);
      await fetchStockInfo();
      await fetchStockLogo();
      await fetchCompanyInfo();
      setLoading(false);
    }
    
    fetchData();
    
  }, [symbol]);

  const Container = styled('div')(({ theme }) => ({
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const Sidebar = styled('div')(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  }));

  const CompanyData = styled('div')(({ theme }) => ({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  }));

  return (
    <>
      { loading ? (
        <LinearProgress color="inherit" />
      ) : (
        <Container>
          <Sidebar>
            <img
              src={ stockLogo }
              alt={ symbol }
              height='200'
              style={{ marginBottom: 20 }} 
            />
            <Typography variant="h3" style={{
              fontWeight: "bold",
              marginBottom: 20,
              fontFamily: "Montserrat",
            }}>
              { stockInfo.companyName }
            </Typography>
            <Typography variant="subtitle1" style={{
              width: "100%",
              fontFamily: "Montserrat",
              padding: 25,
              paddingBottom: 15,
              paddingTop: 0,
              textAlign: "justify",
            }}>
              { companyInfo.longDescription ? companyInfo.longDescription : "No current information" }
            </Typography>
            <CompanyData>
              <span style={{ display: "flex" }}>
                <Typography variant="h5" style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}>
                  CEO:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  { companyInfo.ceo ? companyInfo.ceo : "No current information" }
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h5" style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}>
                  Employees:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  { companyInfo.employees ? companyInfo.employees : "No current information" }
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h5" style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}>
                  Industry:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  { companyInfo.industry ? companyInfo.industry : "No current information" }
                </Typography>
              </span>

              <span style={{ display: "flex" }}>
                <Typography variant="h5" style={{
                  fontWeight: "bold",
                  marginBottom: 20,
                  fontFamily: "Montserrat",
                }}>
                  Website:
                </Typography>
                &nbsp; &nbsp;
                <Typography
                  variant="h5"
                  style={{
                    fontFamily: "Montserrat",
                  }}
                >
                  { companyInfo.industry ? (
                    <Link to={ companyInfo.website }>
                      { companyInfo.website }
                    </Link>
                  ) : "No current information" }
                </Typography>
              </span>
            </CompanyData>
          </Sidebar>
          <StockInfo symbol={symbol} />
        </Container>
      ) }
    </>
  );
}

export default StockPage;