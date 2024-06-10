import Home from '../pages/Home/Home';

import appRoutes from './route';
import { ViewUser, AddUser } from '../pages/Users/index.js';
import NotFound from '../pages/NotFound';

const routeConfig = [
  {
    path: appRoutes.HOME,
    element: <Home />,
  },
  {
    path: appRoutes.VIEWUSER,
    element: <ViewUser />,
  },
  {
    path: appRoutes.ADDUSER,
    element: <AddUser />,
  },
  {
    path: appRoutes.UNKNOWN,
    element: <NotFound />,
  },
];

export default routeConfig;
