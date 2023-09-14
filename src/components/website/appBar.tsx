import {NavLink} from 'react-router-dom';
import { House, PlusCircle, Clipboard, Newspaper, User } from '@phosphor-icons/react';
import { useAppSelector } from "../../services/redux/store.ts";
import { useRef } from "react";

export function AppBar() {
  const isLoggedIn = useAppSelector(state => state.userReducer.isLoggedIn)
  const userRole = useAppSelector(state => state.userReducer.data.role)
  
  return (
    <nav className="appBar plusHighlight">
      <NavLink to="/" className={(navData) => ('appBarIconContainer ' + (navData.isActive ? 'active' : ''))}>
        <House className="appBarIcon" weight="fill" color="#AE2983"/>
        <p>خانه</p>
      </NavLink>
      <NavLink to="/orders" className="appBarIconContainer">
        <Clipboard className="appBarIcon" />
        <p>سفارش ها</p>
      </NavLink>
      {userRole === "USER" &&
          <>
              <NavLink to="/newOrder" className="appBarIconContainer">
                  <PlusCircle className="appBarIcon"/>
                  <p>ثبت </p>
              </NavLink>
              <NavLink to="/mag" className="appBarIconContainer">
                  <Newspaper className="appBarIcon" />
                  <p>مجله</p>
              </NavLink>
          </>
      }
      <NavLink to={isLoggedIn ? "/profile" : '/login'} className="appBarIconContainer">
        <User className="appBarIcon" />
        <p>پروفایل</p>
      </NavLink>
    </nav>
  );
}
