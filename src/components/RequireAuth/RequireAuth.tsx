import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useFindUserByUsernameQuery } from '@shared/api';
import { useAppDispatch, useAppSelector } from 'app/store';
import { PageLoader } from 'components/PageLoader';
import { authActions } from 'entities/Auth.slice';

export const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.userName);
  const { isSuccess } = useFindUserByUsernameQuery({ username: username! }, { skip: !username });
  const location = useLocation();

  if (!username) {
    dispatch(authActions.clear());
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (isSuccess) {
    return <Outlet />;
  }

  return <PageLoader />;
};
