import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
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

const BrandModal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { open } = useSelector((state) => state.modal);

  const [info, setInfo] = useState({
    name: '',
    image: '',
  });

  const handleChange = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createItem({ item: 'brands', info, token }));
    dispatch(getItem({ item: 'brands', token }));
    dispatch(handleClose());
    setInfo({ name: '', image: '' });
  };

  const fields = [
    { label: 'Brand Name *', name: 'name', type: 'text' },
    { label: 'Brand Logo', name: 'image', type: 'url' },
  ];

  return (
    <Modal
      open={open}
      onClose={() => dispatch(handleClose())}
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
            SUBMIT BRAND
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default BrandModal;
