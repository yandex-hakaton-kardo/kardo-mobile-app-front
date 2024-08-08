import { type RouteObject } from 'react-router-dom';
import { IntroRedirect, Layout, RequireAuth } from '@components';
import Admin from '@pages/Admin';
import Auth from '@pages/Auth';
import CompetitionDetail from '@pages/CompetitionDetail';
import CompetitionRequest from '@pages/CompetitionRequest';
import Competitions from '@pages/Competitions';
import Events from '@pages/Events';
import Feed from '@pages/Feed';
import Intro from '@pages/Intro';
import Main from '@pages/Main';
import NotFound from '@pages/NotFound';
import PostDetail from '@pages/PostDetail';
import Profile from '@pages/Profile';
import Settings from '@pages/Settings';
import SignIn from '@pages/SignIn';
import SignUp from '@pages/SignUp';

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
                path: '/competitions/:id',
                Component: CompetitionDetail,
              },
              {
                path: '/competitions/:id/request',
                Component: CompetitionRequest,
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
