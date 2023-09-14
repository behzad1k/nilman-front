import { NavLink, useLocation } from 'react-router-dom';
import { House, PlusCircle, Clipboard, Newspaper, User } from '@phosphor-icons/react';
import { useAppSelector } from "../../services/redux/store.ts";

export function AppBar() {
  const isLoggedIn = useAppSelector(state => state.userReducer.isLoggedIn)
  const userRole = useAppSelector(state => state.userReducer.data.role)
  const location = useLocation();
  console.log(location.pathname);
  return (
    <nav className="appBar plusHighlight">
      {userRole === "USER" &&
        <NavLink to="/">
          <House className="appBarIcon" weight={location.pathname === '/' ? 'fill' : 'regular'} color={location.pathname === '/' ? 'rgb(236, 170, 151)' : '#000'}/>
        </NavLink>
      }
      <NavLink to="/orders">
        <Clipboard className="appBarIcon" weight={location.pathname === '/orders' ? 'fill' : 'regular'} color={location.pathname === '/orders' ? 'rgb(236, 170, 151)' : '#000'}/>
      </NavLink>
      {userRole === "USER" &&
          <>
              <NavLink to="/newOrder" >
                  <PlusCircle className="appBarIcon" weight={location.pathname === '/newOrder' ? 'fill' : 'regular'} color={location.pathname === '/newOrder' ? 'rgb(236, 170, 151)' : '#000'}/>
              </NavLink>
              <NavLink to="/mag">
                  <Newspaper className="appBarIcon" weight={location.pathname === '/mag' ? 'fill' : 'regular'} color={location.pathname === '/mag' ? 'rgb(236, 170, 151)' : '#000'}/>
              </NavLink>
          </>
      }
      <NavLink to={isLoggedIn ? "/profile" : '/login'}>
        <User className="appBarIcon" weight={location.pathname === '/profile' || location.pathname === '/login' ? 'fill' : 'regular'} color={location.pathname === '/profile' || location.pathname === '/login' ? 'rgb(236, 170, 151)' : '#000'}/>
      </NavLink>
    </nav>
  );
}
