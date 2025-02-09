import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import formatDate from '../formatDate';
import { deleteItem, getItem } from '../../redux/reducer/dashboardReducer';
import { useDispatch, useSelector } from 'react-redux';
import { handleEditClick } from '../../redux/reducer/modalReducer';

const SaleCard = ({ sales }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'sales', id: ID, token }));
    dispatch(getItem({ item: 'sales', token }));
  };

  const renderActions = (params) => (
    <>
      <EditIcon
        onClick={() => dispatch(handleEditClick(params.row))}
        style={{ cursor: 'pointer', marginRight: 8 }}
      />
      <DeleteIcon
        onClick={() => deleteHandle(params.row.id)}
        style={{ cursor: 'pointer', color: 'red' }}
      />
    </>
  );

  const rows = sales.map((sale) => ({
    id: sale._id,
    col1: formatDate(sale.updatedAt),
    col2: sale.brandId?.name,
    col3: sale.productId?.name,
    col4: sale.quantity,
    col5: sale.price,
    col6: sale.amount,
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
      renderCell: renderActions,
    },
  ];

  return (
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
  );
};

export default SaleCard;
