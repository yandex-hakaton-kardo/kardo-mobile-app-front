import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const PageLoader = () => (
  // TODO: реализовать экран загрузки страницы
  <Suspense fallback="loading...">
    <Outlet />
  </Suspense>
);
