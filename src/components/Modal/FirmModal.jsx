import { Box, Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItem } from '../../redux/reducer/dashboardReducer';
import { useSelector } from 'react-redux';

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

const FirmModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [info, setInfo] = useState({
    name: '',
    address: '',
    phone: '',
    image: '',
  });

  const handleChange = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createItem({ item: 'firms', info, token }));
    handleClose();
    setInfo({ name: '', address: '', phone: '', image: '' });
  };

  const fields = [
    { label: 'Firm Name *', name: 'name', type: 'text' },
    { label: 'Firm Address', name: 'address', type: 'text' },
    { label: 'Firm Phone', name: 'phone', type: 'text' },
    { label: 'Firm Image', name: 'image', type: 'url' },
  ];

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            SUBMIT FIRM
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FirmModal;
