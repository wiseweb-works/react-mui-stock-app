import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import SaleModal from '../components/Modal/SaleModal';
import SaleCard from '../components/Cards/SaleCard';
import { handleOpen } from '../redux/reducer/modalReducer';
import SaleEditModal from '../components/Modal/SaleEditModal';

const Sales = () => {
  const { sales, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sales.length > 0) dispatch(getItem({ item: 'sales', token }));
  }, [dispatch, token, sales.length]);

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Sales
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => dispatch(handleOpen())}
      >
        New Sale
      </Button>
      <SaleCard sales={sales} />
      <SaleModal />
      <SaleEditModal />
    </Container>
  );
};

export default Sales;
