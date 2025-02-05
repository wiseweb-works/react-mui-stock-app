import { useSelector } from 'react-redux';

const Purchases = () => {
  const { purchases } = useSelector((state) => state.dashboard);
  return <div>{purchases.length > 0 ? purchases : 'Purchases Page'}</div>;
};

export default Purchases;
