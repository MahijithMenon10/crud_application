import { BrowserRouter as Router } from 'react-router-dom';
// import DeleteModal from './components/DeleteModal';

import RouteRenderer from './routes/route-renderer';
const App = () => {
  return (
    <Router>
      <RouteRenderer />
    </Router>
  );
};

export default App;
