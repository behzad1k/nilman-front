import {NavLink} from 'react-router-dom';
import { House, PlusCircle, Clipboard, Newspaper, User } from '@phosphor-icons/react';

export function AppBar() {
  return (
      <nav className="appBar plusHighlight">
        <NavLink to="/" className={(navData) => (navData.isActive ? 'active' : '')}>
          <House className="appBarIcon"/>
        </NavLink>
        <NavLink to="/orders">
          <Clipboard className="appBarIcon" />
        </NavLink>
        <NavLink to="/newOrder">
          <PlusCircle className="appBarIcon"/>
        </NavLink>
        <NavLink to="/mag">
          <Newspaper className="appBarIcon" />
        </NavLink>
        <NavLink to="/profile">
          <User className="appBarIcon" />
        </NavLink>
      </nav>
  );
}
