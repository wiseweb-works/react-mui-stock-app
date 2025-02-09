import { Grid2, Paper, Typography, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Axios import
import SalesChart from '../components/Charts/SalesChart';
import PurchaseChart from '../components/Charts/PurchaseChart';
import { useSelector } from 'react-redux';

const Home = () => {
  const [salesData, setSalesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const salesResponse = await axios.get(`${API_URL}/sales`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const purchaseResponse = await axios.get(`${API_URL}/purchases`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const formattedSalesData = salesResponse.data.data.map((item) => ({
          name: new Date(item.createdAt).toLocaleDateString(),
          sales: item.amount,
        }));
        setSalesData(formattedSalesData);

        const formattedPurchaseData = purchaseResponse.data.data.map(
          (item) => ({
            name: new Date(item.createdAt).toLocaleDateString(),
            purchase: item.amount,
          })
        );
        setPurchaseData(formattedPurchaseData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const totalSales = salesData.reduce((acc, item) => acc + item.sales, 0);
  const totalPurchases = purchaseData.reduce(
    (acc, item) => acc + item.purchase,
    0
  );
  const totalCash = totalSales - totalPurchases;

  if (loading) {
    return (
      <Typography variant="h5" align="center">
        Loading...
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center" gutterBottom>
        Sales & Purchases Dashboard
      </Typography>

      {/* Toplam Bilgileri */}
      <Grid2 container spacing={2} justifyContent="center" p={2}>
        <Grid2 item size={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h5" color="primary">
              ${totalSales}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item size={4}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              bgcolor: totalCash >= 0 ? '#d7ffd9' : '#ffd7d7',
            }}
          >
            <Typography variant="h6">Total Cash</Typography>
            <Typography
              variant="h5"
              color={totalCash >= 0 ? 'success.main' : 'error.main'}
            >
              ${totalCash}
            </Typography>
          </Paper>
        </Grid2>
        <Grid2 item size={4}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f5f5f5' }}>
            <Typography variant="h6">Total Purchases</Typography>
            <Typography variant="h5" color="secondary">
              ${totalPurchases}
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>

      {/* Grafikler */}
      <Grid2 container spacing={2} justifyContent="center" p={2}>
        <Grid2 item xs={12} md={6}>
          <SalesChart data={salesData} />
        </Grid2>
        <Grid2 item xs={12} md={6}>
          <PurchaseChart data={purchaseData} />
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Home;
