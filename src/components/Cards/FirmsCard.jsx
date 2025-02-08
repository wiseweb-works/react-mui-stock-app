import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  CardActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getItem } from '../../redux/reducer/dashboardReducer';
import { handleEditClick } from '../../redux/reducer/modalReducer';

const FirmsCard = ({ firm }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'firms', id: ID, token }));
    dispatch(getItem({ item: 'firms', token }));
  };

  return (
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
        <IconButton
          aria-label="edit"
          onClick={() => dispatch(handleEditClick(firm))}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteHandle(firm._id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FirmsCard;
