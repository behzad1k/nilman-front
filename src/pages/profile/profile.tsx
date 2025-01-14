import { AccountBalanceWalletOutlined, PrivacyTipOutlined } from '@mui/icons-material';
import { PencilLine, SignOut } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/apis/global';
import { useAppSelector } from '../../services/redux/store';
import { formatPrice } from '../../utils/utils';
import { Addresses } from './Addresses';
import { ProfileCard } from './profileCard';

export default function Profile() {
  const userReducer = useAppSelector((state) => state.userReducer);
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
    if (!userReducer.isLoggedIn) {
      navigate('/login');
    }
  }, []);

  return (
    <main className="profileMain">
      <ProfileCard/>
      <section className="infoBox justifyCenter">
        <div className="walletBalance">
          <div>
            <AccountBalanceWalletOutlined/>
            <span>موجودی کیف پول</span>
          </div>
          <span>{formatPrice(userReducer.data?.walletBalance)} تومان</span>
        </div>
      </section>
      <section className="infoBox">
        <div className="profileButton" onClick={() => navigate('/profile/edit')}>
          <PencilLine size={20}/>
          <span>ویرایش اطلاعات کاربری</span>
        </div>
        <div className="profileButton" onClick={() => navigate('/privacy')}>
          <PrivacyTipOutlined/>
          <span>حریم خصوصی</span>
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
      <Addresses editable={true}/>
    </main>
  );
}
