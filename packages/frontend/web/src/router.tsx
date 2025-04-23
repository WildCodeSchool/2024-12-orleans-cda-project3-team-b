import { createBrowserRouter } from 'react-router-dom';

import CreateAlbum from './pages/create-album.tsx';
import CreateSingle from './pages/create-single.tsx';
import HireArtist from './pages/hire-artist.tsx';
import HireStaff from './pages/hire-staff.tsx';
import Home from './pages/home';
import MainMenu from './pages/main-menu';

const router = createBrowserRouter([
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
]);

export default router;
