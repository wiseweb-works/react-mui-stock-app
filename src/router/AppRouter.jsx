import { BrowserRouter, Routes, Route } from 'react-router';

import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRouter from './PrivateRouter';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Firms from '../pages/Firms';
import Brands from '../pages/Brands';
import Purchases from '../pages/Purchases';
import Sales from '../pages/Sales';
import Products from '../pages/Products';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
            {/* <Route path="" element={ <Home/> } />  */}
            <Route index element={<Home />} />
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="sales" element={<Sales />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
