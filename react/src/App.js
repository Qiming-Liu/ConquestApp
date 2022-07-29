// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}
