import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import App from '../../App';
import {AppBar} from '../../components';
import {initialApis} from '../../services/apis/global';
import {AppDispatch, useAppDispatch, useAppSelector} from '../../services/redux/store';
import Layout from './layout';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Mag from './pages/mag/mag';
import NewOrder from './pages/newOrder/newOrder';
import Orders from './pages/orders/orders';
import Payment from './pages/payment/Payment';
import Privacy from './pages/privacy';
import AddressManage from './pages/profile/AddressManage';
import EditProfile from './pages/profile/EditProfile';
import Profile from './pages/profile/profile';
import Feedback from './pages/feedback/feedback';

export default function Website() {
  const dispatch: AppDispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    initialApis(dispatch);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/orders"
        element={
          <Layout>
            <Orders />
          </Layout>
        }
      />
      <Route
        path="/newOrder"
        element={
          <Layout>
            <NewOrder />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/mag"
        element={
          <>
            <Mag />
            <AppBar />
          </>
        }
      />
      <Route path="/payment/verify" element={
        <Layout>
          <Payment />
        </Layout>
      } />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/feedback/:id" element={<Feedback />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/address/edit/:id" element={<AddressManage />} />
      <Route path="/address/add" element={<AddressManage />} />
      <Route
        path="/login"
        element={
          <>
            <Login />
            <AppBar />
          </>
        }
      />
    </Routes>
  );
}
