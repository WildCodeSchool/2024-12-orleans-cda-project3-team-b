import { createBrowserRouter } from 'react-router-dom';

import FirstPageLogin from './pages/first-page-login.tsx';
import HireArtist from './pages/hire-artist.tsx';
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
    path: '/first-page-login',
    element: <FirstPageLogin />,
  },
]);

export default router;
