import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import PurchaseModal from '../components/Modal/PurchaseModal';
import PurchaseCard from '../components/Cards/PurchaseCard';
import { handleOpen } from '../redux/reducer/modalReducer';
import PurchaseEditModal from '../components/Modal/PurchaseEditModal';

const Purchases = () => {
  const { purchases, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!purchases.length > 0) dispatch(getItem({ item: 'purchases', token }));
  }, [dispatch, token, purchases.length]);

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Purchases
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => dispatch(handleOpen())}
      >
        New Purchase
      </Button>
      <PurchaseCard purchases={purchases} />
      <PurchaseModal />
      <PurchaseEditModal />
    </Container>
  );
};

export default Purchases;
