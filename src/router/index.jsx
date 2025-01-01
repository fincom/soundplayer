import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MP3Player from '../components/MP3Player';
import History from '../components/History';
import Settings from '../components/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MP3Player />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]);
