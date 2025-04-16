import { createBrowserRouter } from 'react-router-dom';

import App from './pages/app';
import HireArtist from './pages/hire-artist.tsx';
import Home from './pages/home';
import HomeGame from './pages/home-game';
import InGame from './pages/in-game';
import Login from './pages/login';
import MainMenu from './pages/main-menu';
import Register from './pages/register';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
  {
    path: '/',
    element: <InGame />,
    children: [
      {
        path: 'homepage-game',
        element: <HomeGame />,
      },
      {
        path: '/main-menu',
        element: <MainMenu />,
      },
      {
        path: '/hire-artist',
        element: <HireArtist />,
      },
    ],
  },
]);

export default router;
