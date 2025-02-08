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
import { updateItem, getItem } from '../../redux/reducer/dashboardReducer';
import { handleEditClose } from '../../redux/reducer/modalReducer';

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

const PurchaseEditModal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { firms, brands, products } = useSelector((state) => state.dashboard);
  const { selected: purchase, isEditOpen } = useSelector(
    (state) => state.modal
  );

  const [info, setInfo] = useState({
    firmId: '',
    brandId: '',
    productId: '',
    quantity: '',
    price: '',
  });

  useEffect(() => {
    if (purchase) {
      setInfo({
        firmId: firms.find((f) => f.name === purchase.col2)._id || '',
        brandId: brands.find((f) => f.name === purchase.col3)._id || '',
        productId: products.find((f) => f.name === purchase.col4)._id || '',
        quantity: purchase.col5 || '',
        price: purchase.col6 || '',
      });
    }
  }, [purchase]);

  useEffect(() => {
    if (!firms.length) dispatch(getItem({ item: 'firms', token }));
    if (!brands.length) dispatch(getItem({ item: 'brands', token }));
    if (!products.length) dispatch(getItem({ item: 'products', token }));
  }, [dispatch, token, firms.length, brands.length, products.length]);

  const handleChange = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      updateItem({ item: 'purchases', id: purchase.id, info, token })
    );
    dispatch(getItem({ item: 'purchases', token }));
    dispatch(handleEditClose());
  };

  return (
    <Modal
      open={isEditOpen}
      onClose={() => dispatch(handleEditClose())}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* Firm Dropdown */}
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

          {/* Brand Dropdown */}
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

          {/* Product Dropdown */}
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

          {/* Quantity */}
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

          {/* Price */}
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
            UPDATE PURCHASE
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseEditModal;
