import {Button} from '@mui/material';
import {UserCircle} from '@phosphor-icons/react';
import {Link} from 'react-router-dom';

export function Header({ onBack = null }) {
  // ? TODO: REMOVE BUTTON
  return (
    <header className={`header ${onBack ? 'spaceBetween' : ''}`}>
      {onBack && <i className='backIcon' onClick={onBack}></i>}
      <h2 className="headerText">nilman</h2>
      {onBack && <h2></h2>}
    </header>
  );
}
