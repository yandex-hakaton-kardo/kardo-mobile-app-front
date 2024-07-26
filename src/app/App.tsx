import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LangProvider } from 'context';
import { routes } from './routes';

const router = createBrowserRouter(routes);

const App = () => (
  <LangProvider>
    <RouterProvider router={router} />
  </LangProvider>
);

export default App;
