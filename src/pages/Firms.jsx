import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItem, deleteItem } from '../redux/reducer/dashboardReducer';
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
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FirmModal from '../components/Modal/FirmModal';
import FirmEditModal from '../components/Modal/FirmEditModal';

const Firms = () => {
  const { firms, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedFirm, setSelectedFirm] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClick = (firm) => {
    setSelectedFirm(firm);
    setIsEditOpen(true);
  };

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
        onClick={handleOpen}
      >
        New Firm
      </Button>
      <Grid2 container spacing={2} mt={4}>
        {firms.map((firm) => {
          return (
            <Grid2 key={firm._id} item size={3}>
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
                    <EditIcon onClick={() => handleEditClick(firm)} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteIcon
                      onClick={() =>
                        dispatch(
                          deleteItem({ item: 'firms', id: firm._id, token })
                        )
                      }
                    />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
          );
        })}
      </Grid2>
      <FirmModal open={open} handleClose={handleClose} />
      <FirmEditModal
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
        firm={selectedFirm}
      />
    </Container>
  );
};

export default Firms;
