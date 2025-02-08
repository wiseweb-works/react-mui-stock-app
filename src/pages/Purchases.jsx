import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteItem, getItem } from '../redux/reducer/dashboardReducer';
import formatDate from '../components/formatDate';
import LoadingPlaceholder from '../components/LoadingPlaceholder';
import PurchaseModal from '../components/Modal/PurchaseModal';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Purchases = () => {
  const { purchases, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!purchases.length) dispatch(getItem({ item: 'purchases', token }));
  }, [dispatch, token, purchases.length]);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'purchases', id: ID, token }));
    dispatch(getItem({ item: 'purchases', token }));
  };

  const renderActions = (params) => (
    <>
      <EditIcon
        onClick={() => console.log('Edit')}
        style={{ cursor: 'pointer', marginRight: 8 }}
      />
      <DeleteIcon
        onClick={() => deleteHandle(params.row.id)}
        style={{ cursor: 'pointer', color: 'red' }}
      />
    </>
  );

  const rows = purchases.map((purchase) => ({
    id: purchase._id,
    col1: formatDate(purchase.updatedAt),
    col2: purchase.firmId?.name,
    col3: purchase.brandId?.name,
    col4: purchase.productId?.name,
    col5: purchase.quantity,
    col6: purchase.price,
    col7: purchase.amount,
  }));

  const columns = [
    {
      field: 'col1',
      headerName: 'Date',
      width: 150,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col2',
      headerName: 'Firm',
      width: 310,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col3',
      headerName: 'Brand',
      width: 310,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col4',
      headerName: 'Product',
      width: 310,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col5',
      headerName: 'Quantity',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col6',
      headerName: 'Price',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col7',
      headerName: 'Amount',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col8',
      headerName: 'Actions',
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: renderActions,
    },
  ];

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Purchases
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        New Purchase
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        slots={{ toolbar: GridToolbar }}
        sx={{ mt: '1rem' }}
      />
      <PurchaseModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Purchases;
