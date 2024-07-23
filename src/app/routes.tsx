import { useParams, type RouteObject } from 'react-router-dom';
import { Layout } from '@components';

export const routes: RouteObject[] = [
  {
    path: '/intro',
    element: <div>intro</div>,
  },
  {
    path: '/signin',
    element: <div>signin</div>,
  },
  {
    path: '/signup',
    element: <div>signup</div>,
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <div>main</div>,
      },
      {
        path: '/feed',
        element: <div>feed</div>,
      },
      {
        path: '/competitions',
        element: <div>competitions</div>,
      },
      {
        path: '/competitions/:id',
        Component: () => {
          const { id } = useParams();
          return <div>Competition #{id} page</div>;
        },
      },
      {
        path: '/competitions/:id/request',
        Component: () => {
          const { id } = useParams();
          return <div>Competition #{id} page</div>;
        },
      },
      {
        path: '/events',
        element: <div>events</div>,
      },
      {
        path: '/profile',
        element: <div>profile</div>,
      },
      {
        path: '*',
        element: <div>page not found</div>,
      },
    ],
  },
];
