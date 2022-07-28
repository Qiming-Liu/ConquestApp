import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import Layout from './layouts';
import Index from './pages/Index';
import DocumentPage from './pages/DocumentPage';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Navigate to="/home" /> },
        { path: 'document', element: <DocumentPage /> },
        { path: 'home', element: <Index /> },
      ],
    },
  ]);
}
