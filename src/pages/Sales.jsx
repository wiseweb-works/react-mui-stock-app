import { useSelector } from 'react-redux';

const Sales = () => {
  const { sales } = useSelector((state) => state.dashboard);
  return <div>{sales.length > 0 ? sales : 'Sales Page'}</div>;
};

export default Sales;
