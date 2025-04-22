import { createBrowserRouter } from 'react-router-dom';

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
    path: '/hire-staff',
    element: <HireStaff />,
  },
]);

export default router;
