import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getItem } from '../redux/reducer/dashboardReducer';
import formatDate from '../components/formatDate';

const Sales = () => {
  const { sales, loading } = useSelector((state) => state.dashboard);
  const rows = sales.map((sale, index) => ({
    id: index + 1,
    col1: formatDate(sale.updatedAt),
    col2: sale.brandId.name,
    col3: sale.productId.name,
    col4: sale.quantity,
    col5: sale.price,
    col6: sale.amount,
    col7: 'edit',
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
      headerName: 'Brand',
      width: 467,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col3',
      headerName: 'Product',
      width: 467,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col4',
      headerName: 'Quantity',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col5',
      headerName: 'Price',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col6',
      headerName: 'Amount',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col7',
      headerName: 'Actions',
      width: 100,
      headerAlign: 'center',
      align: 'center',
    },
  ];
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sales.length > 0) dispatch(getItem({ item: 'sales', token }));
  }, [dispatch, token, sales.length]);

  console.log(sales);
  return (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Sales
      </Typography>
      <Button size="medium" color="primary" variant="contained">
        New Sale
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

export default Sales;
