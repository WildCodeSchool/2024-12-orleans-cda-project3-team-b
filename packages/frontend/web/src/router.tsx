import { createBrowserRouter } from 'react-router-dom';

import App from './pages/app.tsx';
import ArtistHirePage from './pages/artist-hire-profile-page.tsx';
import ArtistPage from './pages/artist-profile-page.tsx';
import CreateAlbum from './pages/create-album.tsx';
import CreateSingle from './pages/create-single.tsx';
import ErrorPage from './pages/error-page.tsx';
import HireArtist from './pages/hire-artist.tsx';
import HireStaff from './pages/hire-staff.tsx';
import Home from './pages/home';
import HomeGame from './pages/home-game';
import InGame from './pages/in-game';
import Login from './pages/login';
import MainMenu from './pages/main-menu';
import MyAlbums from './pages/my-albums.tsx';
import MyArtists from './pages/my-artists.tsx';
import Register from './pages/register';
import HttpError from './utils/http-error.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
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
      {
        path: '*',
        loader: () => {
          throw new HttpError('Error 404', 'Not Found', 404);
        },
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
      {
        path: '/artists-hired/:id',
        element: <ArtistHirePage />,
      },
      {
        path: '/artists/:id',
        element: <ArtistPage />,
      },
      {
        path: '/my-albums',
        element: <MyAlbums />,
      },
    ],
  },
]);

export default router;
