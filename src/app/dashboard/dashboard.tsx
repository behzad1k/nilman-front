import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home/home';
import NewService from './pages/newService/newService';
import Users from './pages/users/users';
import Orders from './pages/orders/orders';
import AddUser from './pages/addUser/addUser';
import Services from './pages/services/services.tsx';
import {AppDispatch, useAppDispatch} from '../../services/redux/store.ts';
import {initialApis} from '../../services/apis/global.ts';

export default function Dashboard() {
  const dispatch: AppDispatch = useAppDispatch();

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
        path="/services"
        element={
          <Layout>
            <Services />
          </Layout>
        }
      />
      <Route
        path="/new-service"
        element={
          <Layout>
            <NewService />
          </Layout>
        }
      />
      <Route
        path="/users"
        element={
          <Layout>
            <Users />
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
        path="/add-user"
        element={
          <Layout>
            <AddUser />
          </Layout>
        }
      />
    </Routes>
  );
}
