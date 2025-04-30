import { createBrowserRouter } from 'react-router-dom';

import CreateAlbum from './pages/create-album.tsx';
import CreateSingle from './pages/create-single.tsx';
import ErrorPage from './pages/error-page.tsx';
import HireArtist from './pages/hire-artist.tsx';
import HireStaff from './pages/hire-staff.tsx';
import Home from './pages/home.tsx';
import MainMenu from './pages/main-menu';
import MyArtists from './pages/my-artists.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: '*',
        loader: () => {
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw new Response('', {
            status: 404,
          });
        },
      },
    ],
  },
]);

export default router;
