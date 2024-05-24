import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useContext } from 'react';
import { FC } from 'react';

interface LocationState {
  path: string;
}

const ProtectedRoutes: FC = () => {
  const location = useLocation<LocationState>();
  const { user } = useContext(AuthContext);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/signin" state={{ path: location.pathname }} replace />
  );
};

export default ProtectedRoutes;
