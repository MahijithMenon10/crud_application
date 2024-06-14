// It is responsible for rendering the application and setting up the routing.
// The App component is a functional component that returns the Router component from react-router-dom.

import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteRenderer from './routes/route-renderer';
const App = () => {
  return (
    <Router>
      <ToastContainer />
      <RouteRenderer />
    </Router>
  );
};

export default App;
