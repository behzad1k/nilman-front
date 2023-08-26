import {NavLink} from 'react-router-dom';
import { House, PlusCircle, Clipboard, Newspaper, User } from '@phosphor-icons/react';
import { useAppSelector } from "../../services/redux/store.ts";

export function AppBar() {
  const isLoggedIn = useAppSelector(state => state.userReducer.isLoggedIn)
  const userRole = useAppSelector(state => state.userReducer.data.role)
  return (
    <nav className="appBar plusHighlight">
      <NavLink to="/" className={(navData) => (navData.isActive ? 'active' : '')}>
        <House className="appBarIcon"/>
      </NavLink>
      <NavLink to="/orders">
        <Clipboard className="appBarIcon" />
      </NavLink>
      {userRole === "USER" &&
          <>
              <NavLink to="/newOrder">
                  <PlusCircle className="appBarIcon"/>
              </NavLink>
              <NavLink to="/mag">
                  <Newspaper className="appBarIcon" />
              </NavLink>
          </>
      }
      <NavLink to={isLoggedIn ? "/profile" : '/login'}>
        <User className="appBarIcon" />
      </NavLink>
    </nav>
  );
}
