import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import formatDate from '../formatDate';
import { deleteItem, getItem } from '../../redux/reducer/dashboardReducer';
import { useDispatch, useSelector } from 'react-redux';
import { handleEditClick } from '../../redux/reducer/modalReducer';

const PurchaseCard = ({ purchases }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const deleteHandle = async (ID) => {
    await dispatch(deleteItem({ item: 'purchases', id: ID, token }));
    dispatch(getItem({ item: 'purchases', token }));
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
      flex: 3,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col2',
      headerName: 'Firm',
      flex: 4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col3',
      headerName: 'Brand',
      flex: 4,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col4',
      headerName: 'Product',
      flex: 6,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col5',
      headerName: 'Quantity',
      flex: 2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col6',
      headerName: 'Price',
      flex: 2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col7',
      headerName: 'Amount',
      flex: 2,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'col8',
      headerName: 'Actions',
      flex: 3,
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

export default PurchaseCard;
