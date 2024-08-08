import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {House, PlusCircle, Clipboard, Newspaper, User} from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import {useAppSelector} from '../../services/redux/store.ts';

export function AppBar() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="appBar plusHighlight">
        <NavLink to="/" className="appBarIconContainer">
          <House
            className="appBarIcon"
            weight={location.pathname === '/' ? 'fill' : 'regular'}
            color={location.pathname === '/' ? 'rgb(255,255,255)' : '#ffffff'}
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
          <NavLink to="/newOrder" className="appBarIconContainer">
            <PlusCircle
              className="appBarIcon"
              weight={location.pathname === '/newOrder' ? 'fill' : 'regular'}
              color={location.pathname === '/newOrder' ? 'rgb(255,255,255)' : '#ffffff'}
            />
            <p>ثبت سفارش</p>
          </NavLink>
          <NavLink to="/mag" className="appBarIconContainer">
            <Newspaper
              className="appBarIcon"
              weight={location.pathname === '/mag' ? 'fill' : 'regular'}
              color={location.pathname === '/mag' ? 'rgb(255,255,255)' : '#ffffff'}
            />
            <p>مجله</p>
          </NavLink>
        </>
      <NavLink
        to={userReducer.isLoggedIn ? '/profile' : '/login'}
        className="appBarIconContainer"
      >
        <User
          className="appBarIcon"
          weight={
            location.pathname === '/profile' || location.pathname === '/login'
              ? 'fill'
              : 'regular'
          }
          color={
            location.pathname === '/profile' || location.pathname === '/login'
              ? 'rgb(255,255,255)'
              : '#ffffff'
          }
        />
        <p>{userReducer.isLoggedIn ? 'پروفایل' : 'ورود'}</p>
      </NavLink>
    </nav>
  );
}
