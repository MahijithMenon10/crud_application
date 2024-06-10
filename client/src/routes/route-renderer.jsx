import { useRoutes } from 'react-router-dom';
import routeConfig from './routes-config';
const RouteRenderer = () => {
  const routes = useRoutes(routeConfig);
  return routes;
};

export default RouteRenderer;
