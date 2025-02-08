import { Grid2, Typography, Button, Container } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import FirmModal from '../components/Modal/FirmModal';
import FirmsCard from '../components/Cards/FirmsCard';
import { handleOpen } from '../redux/reducer/modalReducer';
import FirmEditModal from '../components/Modal/FirmEditModal';

const Firms = () => {
  const { firms, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!firms.length > 0) dispatch(getItem({ item: 'firms', token }));
  }, [dispatch, token, firms.length]);

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="lg">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Firms
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={() => dispatch(handleOpen())}
      >
        New Firm
      </Button>
      <Grid2 container spacing={2} mt={4}>
        {firms.map((firm) => (
          <Grid2 key={firm._id} item size={3}>
            <FirmsCard firm={firm} />
          </Grid2>
        ))}
      </Grid2>
      <FirmModal />
      <FirmEditModal />
    </Container>
  );
};

export default Firms;
