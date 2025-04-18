import { AccountBalanceWalletOutlined, PrivacyTipOutlined } from '@mui/icons-material';
import { MapPin, PencilLine, SignOut } from '@phosphor-icons/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
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
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    if (!userReducer.isLoggedIn) {
      navigate('/');
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
        {/* <div className="profileButton" onClick={() => navigate('/profile/edit')}> */}
        {/*   <PencilLine size={20}/> */}
        {/*   <span>ویرایش اطلاعات کاربری</span> */}
        {/* </div> */}
        <NavLink className="profileButton" to="/past-orders">
          <i className="checkoutIcon"></i>
          <span>سفارش های پیشین</span>
        </NavLink>
        <NavLink className="profileButton" to="/privacy">
          <PrivacyTipOutlined/>
          <span>حریم خصوصی</span>
        </NavLink>
        <NavLink className="profileButton" to="/address">
          <MapPin size={25}/>
          <span>آدرس ها</span>
        </NavLink>
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
    </main>
  );
}
