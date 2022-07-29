import { useRoutes } from 'react-router-dom';
// layouts
import Layout from './layouts';
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '*', element: <HomePage /> },
        { path: 'document', element: <DocumentPage /> },
      ],
    },
  ]);
}
