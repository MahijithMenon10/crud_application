import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ViewUser from './pages/ViewUser';
// import DeleteModal from './components/DeleteModal';
import AddUser from './pages/AddUser';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/view/:id" element={<ViewUser />} />
      {/* <Route path="/delete/:id" element={<DeleteModal />} /> */}
      <Route path="/addUser" element={<AddUser />} />
    </Routes>
  );
};

export default App;
