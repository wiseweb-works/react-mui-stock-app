import { Navigate, Outlet } from 'react-router';

const PrivateRouter = () => {
  return true ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
