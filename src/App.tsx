import type { Router as RemixRouter } from '@remix-run/router';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';

import { categoryRouter } from './modules/categories/routes';
import { firstScreenRouter } from './modules/firstScreen/routes';
import { loginRouter } from './modules/login/routes';
import { orderRoutes } from './modules/orders/routes';
import { productRoutes } from './modules/products/routes';
import { userRoutes } from './modules/users/routes';
import { URL_USER } from './shared/constants/Urls';
import { MethodsEnum } from './shared/enumerations/methods.enum';
import { getAuthorizationToken, verifyLoggedIn } from './shared/functions/connection/auth';
import { useNotification } from './shared/hooks/useNotification';
import { useRequests } from './shared/hooks/useRequests';
import { useGlobalReducer } from './store/reducers/globalReducer/useGlobalReducer';

const freeRoutes: RouteObject[] = [...loginRouter];

const loggedInRoutes: RouteObject[] = [
  ...categoryRouter,
  ...firstScreenRouter,
  ...productRoutes,
  ...orderRoutes,
  ...userRoutes,
].map((route) => ({
  ...route,
  loader: verifyLoggedIn,
}));

const router: RemixRouter = createBrowserRouter([...freeRoutes, ...loggedInRoutes]);

function App() {
  const { contextHolder } = useNotification();
  const { request } = useRequests();
  const { setUser } = useGlobalReducer();

  useEffect(() => {
    if (getAuthorizationToken()) {
      request(URL_USER, MethodsEnum.GET, setUser);
    }
  }, []);

  return (
    <div style={{ height: '100%' }}>
      {contextHolder}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#FFC801',
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </div>
  );
}

export default App;
