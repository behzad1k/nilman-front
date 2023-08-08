import {Navigate} from 'react-router-dom';
// import useAuth from '../hooks';

export default function ProtectedRoute({children}: {children: JSX.Element}) {
  // const authStatus = useAuth();
  const authStatus = 'dadwa';

  return authStatus ? children : <Navigate to="/login" />;
}
