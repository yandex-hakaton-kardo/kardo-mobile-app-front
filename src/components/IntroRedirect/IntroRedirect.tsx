import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { LsKeys } from '@shared/constants';

export const IntroRedirect = () => {
  const location = useLocation();

  if (!localStorage.getItem(LsKeys.PASS_INTRO) && location.pathname !== '/intro') {
    return <Navigate to="/intro" />;
  }

  return <Outlet />;
};
