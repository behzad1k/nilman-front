import {useState} from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Box,
} from '@mui/material';

import {AccountCircle, Menu as MenuIcon} from '@mui/icons-material';

import {Drawer} from './drawer';
import {logout} from '../../services/apis/global';
import {useAppDispatch} from '../../services/redux/store';
import {useNavigate} from 'react-router-dom';

export function Header({drawerWidth}: {drawerWidth: number}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(dispatch);
    navigate('/dashboard/login');
  };

  return (
    <>
      <AppBar
        elevation={1}
        position="relative"
        sx={{
          backgroundColor: {xs: 'var(--dashboard-dark)', md: 'white'},
          width: {md: `calc(100% - ${drawerWidth}px)`},
          ml: {md: `${drawerWidth}px`},
          color: {xs: 'white', md: 'var(--dashboard-dark)'},
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2, display: {xs: 'block', md: 'none'}}}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{flexGrow: 1}}>
            نیلمان
          </Typography>

          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>پروفایل</MenuItem>
              <MenuItem onClick={handleLogout}>خروج</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} width={drawerWidth} />
    </>
  );
}
