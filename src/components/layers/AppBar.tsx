import { Clipboard, House, PlusCircle, User } from '@phosphor-icons/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../services/redux/store';
import { useDrawer } from './Drawer/DrawerContext';
import LoginDrawer from '../drawers/LoginDrawer';

export function AppBar() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const location = useLocation();
  const { openDrawer } = useDrawer();
  const navigate = useNavigate();
  
  return (
    <nav className="appBar plusHighlight">
      <NavLink to="/home" className="appBarIconContainer">
        <House
          className="appBarIcon"
          weight={location.pathname === '/home' ? 'fill' : 'regular'}
          color={location.pathname === '/home' ? 'rgb(255,255,255)' : '#ffffff'}
        />
        <p>خانه</p>
      </NavLink>
      <NavLink to="/orders" className="appBarIconContainer">
        <Clipboard
          className="appBarIcon"
          weight={location.pathname === '/orders' ? 'fill' : 'regular'}
          color={location.pathname === '/orders' ? 'rgb(255,255,255)' : '#ffffff'}
        />
        <p>سفارش ها</p>
      </NavLink>
      <>
        <NavLink to="/" className="appBarIconContainer">
          <PlusCircle
            className="appBarIcon"
            weight={location.pathname === '/' ? 'fill' : 'regular'}
            color={location.pathname === '/' ? 'rgb(255,255,255)' : '#ffffff'}
          />
          <p>ثبت سفارش</p>
        </NavLink>
        {/* <NavLink to="/mag" className="appBarIconContainer"> */}
        {/*   <Newspaper */}
        {/*     className="appBarIcon" */}
        {/*     weight={location.pathname === '/mag' ? 'fill' : 'regular'} */}
        {/*     color={location.pathname === '/mag' ? 'rgb(255,255,255)' : '#ffffff'} */}
        {/*   /> */}
        {/*   <p>مجله</p> */}
        {/* </NavLink> */}
      </>
      <NavLink
        to={'/profile'}
        className="appBarIconContainer"
        onClick={(e) => {
          e.preventDefault();
          if (!userReducer.isLoggedIn) {
            openDrawer(<LoginDrawer />, 'bottom', 500);
          } else {
            navigate('/profile')
          }
        }}
      >
        <User
          className="appBarIcon"
          weight={
            location.pathname === '/profile'
              ? 'fill'
              : 'regular'
          }
          color={
            location.pathname === '/profile'
              ? 'rgb(255,255,255)'
              : '#ffffff'
          }
        />
        <p>{userReducer.isLoggedIn ? 'پروفایل' : 'ورود'}</p>
      </NavLink>
    </nav>
  );
}
