import {Routes, Route} from 'react-router-dom';
import Layout from './layout';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import NotFound from './pages/notFound/notFound';

export default function Website() {
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

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
