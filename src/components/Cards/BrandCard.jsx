import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardMedia,
  Typography,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getItem } from '../../redux/reducer/dashboardReducer';
import { handleEditClick } from '../../redux/reducer/modalReducer';

const BrandCard = ({ brand }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'brands', id: ID, token }));
    dispatch(getItem({ item: 'brands', token }));
  };

  return (
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
          <IconButton
            aria-label="edit"
            onClick={() => dispatch(handleEditClick(brand))}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteHandle(brand._id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default BrandCard;
