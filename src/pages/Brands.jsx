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
  CircularProgress,
  Box,
} from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Brands = () => {
  const { brands, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!brands.length > 0) dispatch(getItem({ item: 'brands', token }));
  }, [dispatch, token, brands.length]);

  return loading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size="4rem" />
    </Box>
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Brands
      </Typography>
      <Button size="medium" color="primary" variant="contained">
        New Brands
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
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Paper>
            </Grid2>
          );
        })}
      </Grid2>
    </Container>
  );
};

export default Brands;
