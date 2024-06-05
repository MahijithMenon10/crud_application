import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { FormView } from './pages/Form';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view" element={<FormView />} />
    </Routes>
  );
};

export default App;
