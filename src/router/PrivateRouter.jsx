import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const PrivateRouter = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
