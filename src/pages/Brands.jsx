import { Button, Container, Grid, Typography } from '@mui/material';
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
      <Grid container spacing={2} mt={4} sx={{ justifyContent: 'center' }}>
        {brands.map((brand) => (
          <Grid key={brand._id} item size={{ sm: 10, md: 6, lg: 4, xl: 3 }}>
            <BrandCard brand={brand} />
          </Grid>
        ))}
      </Grid>
      <BrandModal />
      <BrandEditModal />
    </Container>
  );
};

export default Brands;
