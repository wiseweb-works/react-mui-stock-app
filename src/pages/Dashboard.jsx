import {
  Button,
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/reducer/authReducer';
import { useEffect, useState } from 'react';

import {
  brand,
  firms,
  analytics,
  cart,
  purchases,
  sales,
} from '../assets/navbar';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const links = [
    {
      title: 'Dashboard',
      url: '',
      icon: analytics,
    },
    { title: 'Firms', url: 'firms', icon: firms },
    {
      title: 'Products',
      url: 'products',
      icon: cart,
    },
    {
      title: 'Purchases',
      url: 'purchases',
      icon: purchases,
    },
    { title: 'Sales', url: 'sales', icon: sales },
    { title: 'Brands', url: 'brands', icon: brand },
  ];
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {links.map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(`${text.url}`)}
              sx={{
                color: 'secondary.main',
                borderRadius: '1rem',
                transition: 'all 0.7s ease-in-out ',
                // '&.Mui-selected': {
                //   backgroundColor: 'secondary.second',
                //   color: 'white',
                // },
                '&:hover': {
                  backgroundColor: 'secondary.second',
                  color: 'white',
                },
              }}
            >
              <Box
                component="img"
                src={text.icon}
                alt={text.title}
                sx={{
                  width: 24,
                  height: 24,
                  mr: 2,
                }}
              />
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          color: 'secondary.main',
          borderRadius: '10px',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Stock App
          </Typography>
          <Button
            color="inherit"
            onClick={() => dispatch(logoutUser())}
            sx={{
              '&:hover': {
                backgroundColor: 'secondary.second',
                color: 'white',
                '& .MuiSvgIcon-root': {
                  color: 'red',
                },
              },
            }}
          >
            Logout
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
