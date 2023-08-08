import {Routes, Route} from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import {Home, Login, Register, NotFound} from '../pages';
import {AnimatePresence} from 'framer-motion';
import {Layout} from '../components';
import {useLocation} from 'react-router-dom';

export default function AllRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
