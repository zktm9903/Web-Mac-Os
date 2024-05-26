import ReactDOM from 'react-dom/client';
import MacOs from './MacOs';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MacOs />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);
