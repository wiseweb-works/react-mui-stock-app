import { Button, Container, Grid2, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import BrandModal from '../components/Modal/BrandModal';
import BrandCard from '../components/Cards/BrandCard';
import { handleOpen } from '../redux/reducer/modalReducer';
import BrandEditModal from '../components/Modal/BrandEditModal';

const Brands = () => {
  const { brands, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!brands.length > 0) dispatch(getItem({ item: 'brands', token }));
  }, [dispatch, token, brands.length]);

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Brands
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => dispatch(handleOpen())}
      >
        New Brand
      </Button>
      <Grid2 container spacing={2} mt={4}>
        {brands.map((brand) => (
          <Grid2 key={brand._id} item size={3}>
            <BrandCard brand={brand} />
          </Grid2>
        ))}
      </Grid2>
      <BrandModal />
      <BrandEditModal />
    </Container>
  );
};

export default Brands;
