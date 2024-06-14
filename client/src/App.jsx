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
