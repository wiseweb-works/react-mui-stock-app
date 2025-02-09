import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import ProductModal from '../components/Modal/ProductModal';
import ProductCard from '../components/Cards/ProductCard';
import { handleOpen } from '../redux/reducer/modalReducer';

const Products = () => {
  const { products, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length > 0) dispatch(getItem({ item: 'products', token }));
  }, [dispatch, token, products.length]);

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Products
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => dispatch(handleOpen())}
      >
        New Product
      </Button>
      <ProductCard products={products} />
      <ProductModal />
    </Container>
  );
};

export default Products;
