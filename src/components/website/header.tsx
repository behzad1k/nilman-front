import {Button} from '@mui/material';
import {UserCircle} from '@phosphor-icons/react';
import {Link} from 'react-router-dom';

export function Header({ onBack = null }) {
  // ? TODO: REMOVE BUTTON
  return (
    <header className={`header ${onBack ? 'spaceBetween' : ''}`}>
      {onBack && <h2></h2>}
      <h2 className="headerText">nilman</h2>
      {onBack && <i className='backIcon' onClick={onBack}></i>}
    </header>
  );
}
