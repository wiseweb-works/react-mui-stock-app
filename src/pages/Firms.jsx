import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';
import {
  Grid2,
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  CardActions,
  Button,
  Container,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Firms = () => {
  const { firms } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!firms.length > 0) dispatch(getItem({ item: 'firms', token }));
  }, [dispatch, token, firms.length]);

  return (
    <Container>
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Firms
      </Typography>
      <Button size="medium" color="primary" variant="contained">
        New Firm
      </Button>
      <Grid2 container spacing={2} mt={4}>
        {firms.map((firm) => {
          return (
            <Grid2 key={firm.id} item size={3}>
              <Card
                elevation={1}
                sx={{
                  height: '390px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {firm.name}
                  </Typography>
                  <Typography variant="body2">{firm.address}</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  src={firm.image}
                  alt={firm.name}
                  title={firm.name}
                  sx={{ width: '100%', height: '140px', objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="body2">Phone: {firm.phone}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
    </Container>
  );
};

export default Firms;
