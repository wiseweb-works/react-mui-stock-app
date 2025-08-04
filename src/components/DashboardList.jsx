import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { btnStyle, selectedStyle } from '../styles/globalStyles';

import {
  brand,
  firms,
  analytics,
  cart,
  purchases,
  sales,
} from '../assets/navbar';

const links = [
  {
    title: 'Dashboard',
    url: '/stock',
    icon: analytics,
  },
  {
    title: 'Firms',
    url: '/stock/firms',
    icon: firms,
  },
  {
    title: 'Brands',
    url: '/stock/brands',
    icon: brand,
  },
  {
    title: 'Purchases',
    url: '/stock/purchases',
    icon: purchases,
  },
  {
    title: 'Sales',
    url: '/stock/sales',
    icon: sales,
  },
  {
    title: 'Products',
    url: '/stock/products',
    icon: cart,
  },
];

const DashboardList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <Toolbar />
      <List>
        {links.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.url)}
              sx={item.url === location.pathname ? selectedStyle : btnStyle}
            >
              <Box
                component="img"
                src={item.icon}
                alt={item.title}
                sx={{ width: 24, height: 24, mr: 2 }}
              />
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DashboardList;
