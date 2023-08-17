import { useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import { initialApis } from "../../services/apis/global.ts";
import { AppDispatch, useAppDispatch } from "../../services/redux/store.ts";
import { AppBar } from "./components";
import Layout from './layout';
import Home from './pages/home/home';
import Login from './pages/login/login';
import { Mag } from "./pages/mag/mag.tsx";
import Register from './pages/register/register';
import NewOrder from "./pages/newOrder/newOrder.tsx";
import Orders from "./pages/orders/orders.tsx";
import Profile from "./pages/profile/profile.tsx";

export default function Website() {
  const dispatch: AppDispatch = useAppDispatch()

  useEffect(() => {
    initialApis(dispatch)
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
      <Route path="/orders" element={
        <Layout>
          <Orders/>
        </Layout>
      }/>
      <Route path="/newOrder" element={
          <Layout>
            <NewOrder/>
          </Layout>
      }/>
      <Route path="/mag" element={
        <>
          <Mag/>
          <AppBar/>
        </>
      }/>
      <Route path="/profile" element={
          <Layout>
            <Profile/>
          </Layout>
      }/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
