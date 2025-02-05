import { useSelector } from 'react-redux';

const Brands = () => {
  const { brands } = useSelector((state) => state.dashboard);
  return <div>{brands.length > 0 ? brands : 'Brands Page'}</div>;
};

export default Brands;
