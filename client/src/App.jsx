import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { FormView } from './pages/Form';
import ViewUser from './pages/ViewUser';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view/:id" element={<ViewUser />} />
    </Routes>
  );
};

export default App;
