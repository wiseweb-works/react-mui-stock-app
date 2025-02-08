import {
  Button,
  Container,
  Grid2,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardMedia,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BrandModal from '../components/Modal/BrandModal';

const Brands = () => {
  const { brands, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!brands.length > 0) dispatch(getItem({ item: 'brands', token }));
  }, [dispatch, token, brands.length]);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'brands', id: ID, token }));
    dispatch(getItem({ item: 'brands', token }));
  };

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
        onClick={handleOpen}
      >
        New Brand
      </Button>
      <Grid2 container spacing={2} mt={4}>
        {brands.map((brand) => {
          return (
            <Grid2 key={brand._id} item size={3}>
              <Paper square={false} elevation={10}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" gutterBottom>
                      {brand.name}
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    src={brand.image}
                    alt={brand.name}
                    title={brand.name}
                    sx={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'contain',
                      padding: '8px',
                    }}
                  />
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                      <DeleteIcon onClick={() => deleteHandle(brand._id)} />
                    </IconButton>
                  </CardActions>
                </Card>
              </Paper>
            </Grid2>
          );
        })}
      </Grid2>
      <BrandModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Brands;
