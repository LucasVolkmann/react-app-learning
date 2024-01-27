import './main.css';

import { ConfigProvider } from 'antd';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { loginRouter } from './modules/login/LoginRouter';
import { GlobalProvider } from './shared/hooks/useGlobalContext';

const rootRouter: RouteObject[] = [
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <div>Error</div>,
  },
];

const router = createBrowserRouter([...rootRouter, ...loginRouter]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FFC801',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </GlobalProvider>
  </React.StrictMode>,
);
