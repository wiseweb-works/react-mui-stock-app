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

const FirmEditModal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { selected: firm, isEditOpen } = useSelector((state) => state.modal);

  const [info, setInfo] = useState({
    name: '',
    address: '',
    phone: '',
    image: '',
  });

  useEffect(() => {
    if (firm) {
      setInfo({
        name: firm.name || '',
        address: firm.address || '',
        phone: firm.phone || '',
        image: firm.image || '',
      });
    }
  }, [firm]);

  const handleChange = (e) =>
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateItem({ item: 'firms', id: firm._id, info, token }));
    dispatch(getItem({ item: 'firms', token }));
    dispatch(handleEditClose());
  };

  const fields = [
    { label: 'Firm Name *', name: 'name', type: 'text' },
    { label: 'Firm Address', name: 'address', type: 'text' },
    { label: 'Firm Phone', name: 'phone', type: 'text' },
    { label: 'Firm Image', name: 'image', type: 'url' },
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
            UPDATE FIRM
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FirmEditModal;
