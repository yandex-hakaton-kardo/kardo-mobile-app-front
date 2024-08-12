import { type RouteObject } from 'react-router-dom';
import {
  Admin,
  Auth,
  CompetitionDetail,
  CompetitionRequest,
  Competitions,
  Events,
  Feed,
  Intro,
  Main,
  NotFound,
  PostDetail,
  Profile,
  Settings,
  SignIn,
  SignUp,
} from '@pages';
import { IntroRedirect, Layout, RequireAuth } from '@shared/ui';

export const routes: RouteObject[] = [
  {
    element: <IntroRedirect />,
    children: [
      {
        path: '/intro',
        Component: Intro,
      },
      {
        path: '/auth',
        Component: Auth,
      },
      {
        path: '/auth/signin',
        Component: SignIn,
      },
      {
        path: '/auth/signup',
        Component: SignUp,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/settings',
            Component: Settings,
          },
          {
            path: '/competitions/:id',
            Component: CompetitionDetail,
          },
          {
            path: '/competitions/:id/request',
            Component: CompetitionRequest,
          },
          {
            element: <Layout />,
            children: [
              {
                path: '/admin',
                Component: Admin,
              },
              {
                path: '/',
                Component: Main,
              },
              {
                path: '/feed',
                Component: Feed,
              },
              {
                path: '/feed/:postId',
                Component: PostDetail,
              },
              {
                path: '/competitions',
                Component: Competitions,
              },
              {
                path: '/events',
                Component: Events,
              },
              {
                path: '/profile',
                Component: Profile,
              },
              {
                path: '*',
                Component: NotFound,
              },
            ],
          },
        ],
      },
    ],
  },
];
