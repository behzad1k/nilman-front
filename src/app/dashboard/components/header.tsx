import {useState} from 'react';
import {Link} from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Fab,
  Divider,
} from '@mui/material';
import {
  AccountCircle,
  Menu as MenuIcon,
  People,
  Category,
  Assignment,
  Close,
} from '@mui/icons-material';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listItems = [
    {
      icon: <People />,
      text: 'کاربران',
      link: '/users',
    },
    {
      icon: <Assignment />,
      text: 'سفارش ها',
      link: '/orders',
    },
    {
      icon: <Category />,
      text: 'خدمات',
      link: '/services',
    },
  ];

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{mr: 2}}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" sx={{flexGrow: 1}}>
            زیبا آنلاین
          </Typography>

          <div>
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
              <MenuItem onClick={handleClose}>خروج</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{[`& .MuiDrawer-paper`]: {width: '70%', maxWidth: '300px'}}}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Fab
          color="primary"
          size="small"
          aria-label="close"
          sx={{margin: 2}}
          onClick={() => setDrawerOpen(false)}
        >
          <Close />
        </Fab>
        <Divider />
        <List>
          {listItems.map((item, index) => (
            <Link key={index} to={item.link}>
              <ListItem disablePadding>
                <ListItemButton sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                  <ListItemIcon sx={{minWidth: 'unset'}}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
