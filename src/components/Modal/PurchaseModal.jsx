import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createItem, getItem } from '../../redux/reducer/dashboardReducer';
import { handleClose } from '../../redux/reducer/modalReducer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const PurchaseModal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { firms, brands, products } = useSelector((state) => state.dashboard);
  const { open } = useSelector((state) => state.modal);

  const [info, setInfo] = useState({
    firmId: '',
    brandId: '',
    productId: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    if (!firms.length) dispatch(getItem({ item: 'firms', token }));
    if (!brands.length) dispatch(getItem({ item: 'brands', token }));
    if (!products.length) dispatch(getItem({ item: 'products', token }));
  }, [dispatch, token, firms.length, brands.length, products.length]);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchaseData = {
      firmId: info.firmId,
      brandId: info.brandId,
      productId: info.productId,
      quantity: Number(info.quantity),
      price: Number(info.price),
    };
    await dispatch(
      createItem({ item: 'purchases', info: purchaseData, token })
    );
    dispatch(getItem({ item: 'purchases', token }));
    dispatch(handleClose());
    setInfo({
      firmId: '',
      brandId: '',
      productId: '',
      quantity: '',
      price: '',
    });
  };

  if (!firms.length || !brands.length || !products.length) {
    return <p>Loading...</p>;
  }

  return (
    <Modal
      open={open}
      onClose={() => dispatch(handleClose())}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Firm</InputLabel>
            <Select
              name="firmId"
              value={info.firmId || ''}
              onChange={handleChange}
              required
            >
              {firms.map((firm) => (
                <MenuItem key={firm._id} value={firm._id}>
                  {firm.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Brand</InputLabel>
            <Select
              name="brandId"
              value={info.brandId || ''}
              onChange={handleChange}
              required
            >
              {brands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Product</InputLabel>
            <Select
              name="productId"
              value={info.productId || ''}
              onChange={handleChange}
              required
            >
              {products.map((product) => (
                <MenuItem key={product._id} value={product._id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={info.quantity}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={info.price}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            SUBMIT PURCHASE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseModal;
