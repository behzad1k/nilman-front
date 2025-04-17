import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppBar, Loading } from '../components';
import InstallPrompt from '../components/common/InstallPrompt';
import Home from '../pages/home/home';
import Login from '../pages/login/login';
import Mag from '../pages/mag/mag';
import NewOrder from '../pages/newOrder/newOrder';
import Orders from '../pages/orders/orders';
import Payment from '../pages/payment/Payment';
import Privacy from '../pages/privacy';
import Address from '../pages/profile/Address/Address';
import AddressManage from '../pages/profile/AddressManage';
import EditProfile from '../pages/profile/EditProfile';
import Profile from '../pages/profile/profile';
import Rules from '../pages/rules';
import { initialApis } from '../services/apis/global';
import { AppDispatch, useAppDispatch, useAppSelector } from '../services/redux/store';
import Layout from './layout';

export default function Website() {
  const dispatch: AppDispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.loadingReducer.loading);

  useEffect(() => {
    initialApis(dispatch);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <Home/>
            </Layout>
          }
        />
        <Route
          path="/orders"
          element={
            <Layout>
              <Orders/>
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <NewOrder/>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile/>
            </Layout>
          }
        />
        <Route
          path="/mag"
          element={
            <>
              <Mag/>
              <AppBar/>
            </>
          }
        />
        <Route path="/payment/verify" element={
          <Layout>
            <Payment/>
          </Layout>
        }/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/profile/edit" element={<EditProfile/>}/>
        <Route path="/address/edit/:id" element={<AddressManage/>}/>
        <Route path="/address/add" element={<AddressManage/>}/>
        <Route path="/address" element={<Address/>}/>
        <Route path="/rules" element={<Rules/>}/>
        <Route
          path="/login"
          element={
            <>
              <Login/>
              <AppBar/>
            </>
          }
        />
      </Routes>
      <InstallPrompt />
      {/* {loading && <Loading/>} */}
    </>

  );
}
