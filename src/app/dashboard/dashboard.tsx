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
        path="/dashboard"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/dashboard/new-service"
        element={
          <Layout>
            <NewService />
          </Layout>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />
      <Route
        path="/dashboard/orders"
        element={
          <Layout>
            <Orders />
          </Layout>
        }
      />
    </Routes>
  );
}
