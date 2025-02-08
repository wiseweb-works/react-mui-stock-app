import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { deleteItem, getItem } from '../redux/reducer/dashboardReducer';
import LoadingPlaceholder from '../components/LoadingPlaceholder';

import DeleteIcon from '@mui/icons-material/Delete';
import ProductModal from '../components/Modal/ProductModal';

const Products = () => {
  const { products, loading } = useSelector((state) => state.dashboard);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!products.length > 0) dispatch(getItem({ item: 'products', token }));
  }, [dispatch, token, products.length]);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'products', id: ID, token }));
    dispatch(getItem({ item: 'products', token }));
  };

  const renderActions = (params) => (
    <>
      <DeleteIcon
        onClick={() => deleteHandle(params.row.id)}
        style={{ cursor: 'pointer', color: 'red' }}
      />
    </>
  );

  const rows = products.map((product) => ({
    id: product._id,
    col1: product._id,
    col2: product.categoryId?.name,
    col3: product.brandId?.name,
    col4: product.name,
    col5: product.quantity,
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
      renderCell: renderActions,
    },
  ];

  return loading ? (
    <LoadingPlaceholder />
  ) : (
    <Container maxWidth="xl">
      <Typography sx={{ textAlign: 'center' }} variant="h4">
        Products
      </Typography>
      <Button
        size="medium"
        color="primary"
        variant="contained"
        onClick={handleOpen}
      >
        New Product
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        // disableSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        sx={{ mt: '1rem' }}
      />
      <ProductModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default Products;
