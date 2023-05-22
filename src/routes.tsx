import React from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
// Error pages

const Page404 = React.lazy(() => import('./components/modules/Page404'));
const Page500 = React.lazy(() => import('./components/modules/Page500'));
const Page403 = React.lazy(() => import('./components/modules/Page403'));
const Dashboard = React.lazy(() => import('./components/modules/Dashboard/Dashboard'));
const UserSearch = React.lazy(() => import('./components/modules/UsersSearch/UserSearch'));

const FaceRecognition = React.lazy(() => import('./components/modules/FaceRecognition/FaceRecognition'));
const GroupRecognition = React.lazy(() => import('./components/modules/GroupRecognition/GroupRecognition'));

const routes: RouteObject[] = [
  { path: '/', element: <Dashboard /> },
  { path: '/search-users/:type', element: <UserSearch /> },
  { path: '/:id/face-recognition/:type', element: <FaceRecognition /> },
  { path: '/404', element: <Page404 /> },
  { path: '/500', element: <Page500 /> },
  { path: '/403', element: <Page403 /> },
  { path: '/group-recognition', element: <GroupRecognition /> },
  { path: '*', element: <Navigate to="/404" replace/> },
];

const RouteRender = () => useRoutes(routes);

export { RouteRender, routes };

