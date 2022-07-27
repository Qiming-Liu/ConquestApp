import { useRoutes } from 'react-router-dom';
// layouts
import Layout from './layouts';
import Index from './pages/Index';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '*',
      element: <Layout />,
      children: [
        { path: '/document', element: <DocumentPage /> },
        { path: '*', element: <Index /> },
      ],
    },
  ]);
}
