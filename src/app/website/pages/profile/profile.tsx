// @ts-nocheck
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../../../services/redux/store.ts';
import {ProfileCard} from './profileCard.tsx';
import {Addresses} from './Addresses.tsx';

export default function Profile() {
  const loggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);
  return (
    <main className="profileMain">
      <ProfileCard />
      <h3>آدرس ها</h3>
      <Addresses />
    </main>
  );
}
