import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useFindUserByUsernameQuery } from '@shared/api';
import { useAppDispatch, useAppSelector } from 'app/store';
import { authActions } from 'entities/Auth';
import { PageLoader } from '../PageLoader';

export const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(state => state.auth.userName);
  const { isSuccess, isError } = useFindUserByUsernameQuery({ username: username ?? '' }, { skip: !username });
  const location = useLocation();

  useEffect(() => {
    if (isError) {
      dispatch(authActions.clear());
    }
  }, [dispatch, isError]);

  if (!username) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (isSuccess) {
    return <Outlet />;
  }

  return <PageLoader />;
};
