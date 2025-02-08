import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getItem } from '../redux/reducer/dashboardReducer';
import formatDate from '../components/formatDate';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Purchases = () => {
  const { purchases, loading } = useSelector((state) => state.dashboard);
  const rows = purchases.map((purchase, index) => ({
    id: index + 1,
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
      renderCell: (params) => (
        <>
          <EditIcon onClick={() => console.log('Edit')}>Edit</EditIcon>
          <DeleteIcon onClick={() => console.log('Delete')}>Delete</DeleteIcon>
        </>
      ),
    },
  ];
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!purchases.length > 0) dispatch(getItem({ item: 'purchases', token }));
  }, [dispatch, token, purchases.length]);

  console.log(purchases);
  // console.log(formatDate('2025-02-01T07:43:32.282Z'));
  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Purchases
      </Typography>
      <Button size="medium" color="primary" variant="contained">
        New Purchase
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        // checkboxSelection
        // disableSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        sx={{ mt: '1rem' }}
      />
    </Container>
  );
};

export default Purchases;
