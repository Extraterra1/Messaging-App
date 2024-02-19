import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Landing from './src/views/Landing';
import Login from './src/views/Login';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    }
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
