import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MUIDrwaer,
} from '@mui/material';

import {People, Assignment, Category, PersonAdd} from '@mui/icons-material';

import {Link} from 'react-router-dom';

const listItems = [
  {
    icon: <People />,
    text: 'کاربران',
    link: '/dashboard/users',
  },
  {
    icon: <Assignment />,
    text: 'سفارش ها',
    link: '/dashboard/orders',
  },
  {
    icon: <Category />,
    text: 'خدمات',
    link: '/dashboard/services',
  },
  {
    icon: <Category />,
    text: 'افزودن خدمات',
    link: '/dashboard/new-service',
  },
  {
    icon: <PersonAdd />,
    text: 'افزودن کاربر',
    link: '/dashboard/add-user',
  },
];

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
  width: number;
};

export function Drawer({open, setOpen, width}: Props) {
  const drawer = (
    <nav>
      <List>
        {listItems.map((item, index) => (
          <Link key={index} to={item.link}>
            <ListItem disablePadding>
              <ListItemButton sx={{display: 'flex', gap: 2, alignItems: 'center'}}>
                <ListItemIcon sx={{minWidth: 'unset', color: '#A9B7D0'}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{color: '#A9B7D0'}} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </nav>
  );

  return (
    <>
      <MUIDrwaer
        variant="temporary"
        ModalProps={{
          keepMounted: true,
        }}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: {xs: 'block', md: 'none'},
          '& .MuiDrawer-paper': {width: `${width}px`},
          '& .MuiPaper-root': {backgroundColor: 'var(--dashboard-dark)'},
        }}
      >
        {drawer}
      </MUIDrwaer>

      <MUIDrwaer
        variant="permanent"
        sx={{
          display: {xs: 'none', md: 'block'},
          '& .MuiDrawer-paper': {width: `${width}px`},
          '& .MuiPaper-root': {backgroundColor: 'var(--dashboard-dark)'},
        }}
      >
        {drawer}
      </MUIDrwaer>
    </>
  );
}
