import {Routes, Route} from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home/home';
import NewService from './pages/newService/newService';
import Users from './pages/users/users';
import Orders from './pages/orders/orders';

export default function Dashboard() {
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
    </Routes>
  );
}
