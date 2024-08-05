import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from 'app/store';

export const RequireAuth = () => {
  const { accessToken } = useAppSelector(state => state.auth);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
