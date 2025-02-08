import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
  const { products, loading } = useSelector((state) => state.dashboard);
  const rows = products.map((product, index) => ({
    id: index,
    col1: product._id,
    col2: product.categoryId?.name,
    col3: product.brandId?.name,
    col4: product.name,
    col5: product.quantity,
    col6: 'edit',
  }));

  const columns = [
    {
      field: 'col1',
      headerName: 'ID',
      width: 70,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col2',
      headerName: 'Category',
      width: 365,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col3',
      headerName: 'Brand',
      width: 365,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col4',
      headerName: 'Product Name',
      width: 365,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col5',
      headerName: 'Stock',
      width: 140,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col6',
      headerName: 'Action',
      width: 180,
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
    if (!products.length > 0) dispatch(getItem({ item: 'products', token }));
  }, [dispatch, token, products.length]);

  console.log(products);

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Products
      </Typography>
      <Button size="medium" color="primary" variant="contained">
        New Product
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

export default Products;
