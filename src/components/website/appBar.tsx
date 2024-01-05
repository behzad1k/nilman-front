import {NavLink, useLocation} from 'react-router-dom';
import {House, PlusCircle, Clipboard, Newspaper, User} from '@phosphor-icons/react';
import {useAppSelector} from '../../services/redux/store.ts';

export function AppBar() {
  const userReducer = useAppSelector((state) => state.userReducer);
  const location = useLocation();

  return (
    <nav className="appBar plusHighlight">
      {userReducer.data.role === 'USER' && (
        <NavLink to="/" className="appBarIconContainer">
          <House
            className="appBarIcon"
            weight={location.pathname === '/' ? 'fill' : 'regular'}
            color={location.pathname === '/' ? 'rgb(236, 170, 151)' : '#000'}
          />
          <p>خانه</p>
        </NavLink>
      )}
      <NavLink to="/orders" className="appBarIconContainer">
        <Clipboard
          className="appBarIcon"
          weight={location.pathname === '/orders' ? 'fill' : 'regular'}
          color={location.pathname === '/orders' ? 'rgb(236, 170, 151)' : '#000'}
        />
        <p>سفارش ها</p>
      </NavLink>
      {userReducer.data.role === 'USER' && (
        <>
          <NavLink to="/newOrder" className="appBarIconContainer">
            <PlusCircle
              className="appBarIcon"
              weight={location.pathname === '/newOrder' ? 'fill' : 'regular'}
              color={location.pathname === '/newOrder' ? 'rgb(236, 170, 151)' : '#000'}
            />
            <p>ثبت </p>
          </NavLink>
          <NavLink to="/mag" className="appBarIconContainer">
            <Newspaper
              className="appBarIcon"
              weight={location.pathname === '/mag' ? 'fill' : 'regular'}
              color={location.pathname === '/mag' ? 'rgb(236, 170, 151)' : '#000'}
            />
            <p>مجله</p>
          </NavLink>
        </>
      )}
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
              ? 'rgb(236, 170, 151)'
              : '#000'
          }
        />
        <p>{userReducer.isLoggedIn ? 'پروفایل' : 'ورود'}</p>
      </NavLink>
    </nav>
  );
}
