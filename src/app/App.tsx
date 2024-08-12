import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LangProvider } from 'context';
import { routes } from './routes';
import { store } from './store';

const router = createBrowserRouter(routes);
dayjs.locale(ru);

const App = () => (
  <LangProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </LangProvider>
);

export default App;
