import { useSelector } from 'react-redux';

const Products = () => {
  const { products } = useSelector((state) => state.dashboard);
  return <div>{products.length > 0 ? products : 'Products Page'}</div>;
};

export default Products;
