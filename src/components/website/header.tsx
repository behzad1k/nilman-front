import {Button} from '@mui/material';
import {UserCircle} from '@phosphor-icons/react';
import {Link} from 'react-router-dom';

export function Header() {
  // ? TODO: REMOVE BUTTON
  return (
    <header className="header">
      <h2>nilman</h2>
      <Link to="/dashboard" style={{position: 'absolute', right: '0'}}>
        <Button variant="text">داشبورد (تست)</Button>
      </Link>
    </header>
  );
}
