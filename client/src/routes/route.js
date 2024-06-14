// This file  is the route configuration for the application. It defines the routes for the application using the useRoutes hook from the react-router-dom library.
const appRoutes = {
  HOME: '/',
  VIEWUSER: '/viewuser/:id',
  ADDUSER: '/adduser',
  EDITUSER: '/edituser/:id',
  UNKNOWN: '*',
};

export default appRoutes;
