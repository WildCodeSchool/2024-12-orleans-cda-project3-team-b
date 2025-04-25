import { createBrowserRouter } from 'react-router-dom';

import App from './pages/app';
import CreateAlbum from './pages/create-album.tsx';
import CreateSingle from './pages/create-single.tsx';
import HireArtist from './pages/hire-artist.tsx';
import HireStaff from './pages/hire-staff.tsx';
import Home from './pages/home';
import HomeGame from './pages/home-game';
import InGame from './pages/in-game';
import Login from './pages/login';
import MainMenu from './pages/main-menu';
import MyArtists from './pages/my-artists.tsx';
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
  {
    path: '/create-single',
    element: <CreateSingle />,
  },
  {
    path: '/create-album',
    element: <CreateAlbum />,
  },
  {
    path: '/hire-staff',
    element: <HireStaff />,
  },
  {
    path: '/my-artists',
    element: <MyArtists />,
  },
]);

export default router;
