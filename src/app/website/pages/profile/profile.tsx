import { PencilLine, SignOut } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../services/apis/global.ts';
import { useAppSelector } from '../../../../services/redux/store.ts';
import { Addresses } from './Addresses.tsx';
import { ProfileCard } from './profileCard.tsx';

export default function Profile() {
  const loggedIn = useAppSelector((state) => state.userReducer.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    sessionStorage.removeItem('new-order');
    sessionStorage.removeItem('step');
    logout(dispatch);
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  return (
    <main className="profileMain">
      <ProfileCard/>
      <section className="infoBox">
        <div className="profileButton" onClick={() => navigate('/profile/edit')}>
          <PencilLine size={20}/>
          <span>ویرایش اطلاعات کابری</span>
        </div>
        <div className="profileButton" onClick={handleLogout}>
          <SignOut
            weight={'bold'}
            className="logout"
            size={20}
            color={'#e85959'}
          />
          <span>خروج از حساب</span>
        </div>
      </section>
      <h3>آدرس ها</h3>
      <Addresses/>
    </main>
  );
}
