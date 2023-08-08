import {Link} from 'react-router-dom';
import {House, User, Clipboard} from '@phosphor-icons/react';

export function AppBar() {
  return (
    <nav className="appBar">
        <Link to="/search">
            <User className="appBarIcon" />
        </Link>
        <Link to="/">
            <House className="appBarIcon" />
        </Link>
        <Link to="/profile">
          <Clipboard className="appBarIcon" />
        </Link>
    </nav>
  );
}
