import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { Layout, PageLoader } from '@components';
import { RequireAuth } from 'components/RequireAuth';

export const routes: RouteObject[] = [
  {
    element: <PageLoader />,
    children: [
      {
        path: '/intro',
        Component: lazy(async () => import('@pages/Intro')),
      },
      {
        path: '/auth',
        Component: lazy(async () => import('@pages/Auth')),
      },
      {
        path: '/auth/signin',
        Component: lazy(async () => import('@pages/SignIn')),
      },
      {
        path: '/auth/signup',
        Component: lazy(async () => import('@pages/SignUp')),
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/settings',
            Component: lazy(async () => import('@pages/Settings')),
          },
          {
            element: <Layout />,
            children: [
              {
                element: <PageLoader />,
                children: [
                  {
                    path: '/',
                    Component: lazy(async () => import('@pages/Main')),
                  },
                  {
                    path: '/feed',
                    Component: lazy(async () => import('@pages/Feed')),
                  },
                  {
                    path: '/competitions',
                    Component: lazy(async () => import('@pages/Competitions')),
                  },
                  {
                    path: '/competitions/:id',
                    Component: lazy(async () => import('@pages/CompetitionDetail')),
                  },
                  {
                    path: '/competitions/:id/request',
                    Component: lazy(async () => import('@pages/CompetitionRequest')),
                  },
                  {
                    path: '/events',
                    Component: lazy(async () => import('@pages/Events')),
                  },
                  {
                    path: '/profile',
                    Component: lazy(async () => import('@pages/Profile')),
                  },
                  {
                    path: '*',
                    Component: lazy(async () => import('@pages/NotFound')),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
