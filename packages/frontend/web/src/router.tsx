import { createBrowserRouter } from 'react-router-dom';

import App from './pages/app';
import Home from './pages/home';
import HomeGame from './pages/home-game';
import Loggin from './pages/loggin';
import Private from './pages/private';
import Register from './pages/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'loggin',
        element: <Loggin />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <Private />,
    children: [{ path: 'homepage-game', element: <HomeGame /> }],
  },
]);

export default router;
