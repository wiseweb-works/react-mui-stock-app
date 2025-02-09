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
const ProductModal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { categories, brands } = useSelector((state) => state.dashboard);
  const { open } = useSelector((state) => state.modal);

  const [info, setInfo] = useState({
    categoryId: '',
    brandId: '',
    name: '',
  });

  useEffect(() => {
    if (!categories.length) dispatch(getItem({ item: 'categories', token }));
    if (!brands.length) dispatch(getItem({ item: 'brands', token }));
  }, [dispatch, token, brands.length, categories.length]);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productsData = {
      categoryId: info.categoryId,
      brandId: info.brandId,
      name: info.name,
    };
    await dispatch(createItem({ item: 'products', info: productsData, token }));
    dispatch(getItem({ item: 'products', token }));
    dispatch(handleClose());
    setInfo({
      categoryId: '',
      brandId: '',
      name: '',
    });
  };

  if (!brands.length || !categories.length) {
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
            <InputLabel>Categories</InputLabel>
            <Select
              name="categoryId"
              value={info.categoryId || ''}
              onChange={handleChange}
              required
            >
              {categories.map((categorie) => (
                <MenuItem key={categorie._id} value={categorie._id}>
                  {categorie.name}
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

          <TextField
            label="Product Name"
            name="name"
            type="text"
            value={info.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            SUBMIT PRODUCT
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
