import { createBrowserRouter } from 'react-router-dom';

import HireArtist from './pages/hire-artist.tsx';
import Home from './pages/home';
import MainMenu from './pages/main-menu';
import SignIn from './pages/sign-in.tsx';

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
    path: '/sign-in',
    element: <SignIn />,
  },
]);

export default router;
