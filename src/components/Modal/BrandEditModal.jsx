import { Box, Button, Modal, TextField } from '@mui/material';
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

const BrandEditModal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { selected: brand, isEditOpen } = useSelector((state) => state.modal);

  const [info, setInfo] = useState({
    name: '',
    image: '',
  });

  useEffect(() => {
    if (brand) {
      setInfo({
        name: brand.name || '',
        image: brand.image || '',
      });
    }
  }, [brand]);

  const handleChange = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateItem({ item: 'brands', id: brand._id, info, token }));
    dispatch(getItem({ item: 'brands', token }));
    dispatch(handleEditClose());
  };

  const fields = [
    { label: 'Brand Name *', name: 'name', type: 'text' },
    { label: 'Brand Logo', name: 'image', type: 'url' },
  ];

  return (
    <Modal
      open={isEditOpen}
      onClose={() => dispatch(handleEditClose())}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Box component="form" onSubmit={handleSubmit}>
          {fields.map(({ label, name, type }) => (
            <TextField
              key={name}
              label={label}
              name={name}
              type={type}
              variant="outlined"
              value={info[name]}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
          ))}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            UPDATE BRAND
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BrandEditModal;
