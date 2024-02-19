import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RequireAuth from '@auth-kit/react-router/RequireAuth';

import Landing from './src/views/Landing';
import Login from './src/views/Login';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <RequireAuth fallbackPath="/login">
          <Landing />
        </RequireAuth>
      )
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
