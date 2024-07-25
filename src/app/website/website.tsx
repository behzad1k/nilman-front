import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import App from '../../App.tsx';
import {AppBar} from '../../components';
import {initialApis} from '../../services/apis/global.ts';
import {AppDispatch, useAppDispatch, useAppSelector} from '../../services/redux/store.ts';
import Layout from './layout';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Mag from './pages/mag/mag.tsx';
import NewOrder from './pages/newOrder/newOrder.tsx';
import Orders from './pages/orders/orders.tsx';
import Payment from './pages/payment/Payment.tsx';
import AddressManage from './pages/profile/AddressManage';
import EditProfile from './pages/profile/EditProfile';
import Profile from './pages/profile/profile.tsx';
import Feedback from './pages/feedback/feedback.tsx';

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
