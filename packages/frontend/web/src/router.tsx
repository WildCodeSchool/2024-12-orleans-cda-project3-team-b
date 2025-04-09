import { createBrowserRouter } from 'react-router-dom';

import HireArtist from './pages/hire-artist.tsx';
import Home from './pages/home';
import MainMenu from './pages/main-menu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/mainmenu',
    element: <MainMenu />,
  },
  {
    path: '/hireartist',
    element: <HireArtist />,
  },
]);

export default router;
