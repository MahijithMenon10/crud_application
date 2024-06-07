import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../features/data/dataSlice.js';
import { updateStatus } from '../features/data/dataSlice';

import { BsThreeDotsVertical } from 'react-icons/bs';
import Modal from 'react-modal';
import { CircularPagination } from '../components/Pagination.jsx';
const Home = () => {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.data);
  const [isOpen, setIsOpen] = useState(null);

  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const handleSwitchChange = (userId) => (checked) => {
    dispatch(updateStatus({ id: userId, status: checked }));
  };

  const handleSearch = () => {
    navigate(
      `?name=${nameFilter}&email=${emailFilter}&status=${statusFilter}&date=${dateFilter}`
      //object for redirect with query params
    );
    dispatch(
      fetchUsers({
        name: nameFilter,
        email: emailFilter,
        status: statusFilter,
        date: dateFilter,
      })
    );
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '75%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '200px',
      height: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#f3f4f6',
    },
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
          type="button"
          onClick={() => navigate('/addUser')}
        >
          Add Users
        </button>

        <div className="flex ">
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
            placeholder="Search by name..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />

          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-red-900 flex-auto m-2"
            placeholder="Search by email..."
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />

          <select
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Today">Today</option>
            <option value="this week">This Week</option>
            <option value="This month">This Month</option>
          </select>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 flex-auto"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-3xl font-semibold text-center my-4">
          Consumer Data
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div key={item._id} className="text-sm text-gray-900">
                      <Switch
                        onChange={handleSwitchChange(item._id)}
                        checked={item.status}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => setIsOpen(item._id)}>
                      <BsThreeDotsVertical />
                    </button>
                    <div>
                      <Modal
                        isOpen={isOpen === item._id}
                        style={customStyles}
                        onRequestClose={() => setIsOpen(null)}
                        ariaHideApp={false}
                      >
                        <div className="flex flex-col space-y-4">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate(`/view/${item._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate(`/edit/${item._id}`)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => navigate(`/delete/${item._id}`)}
                          >
                            Delete
                          </button>
                        </div>
                      </Modal>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <CircularPagination />
    </div>
  );
};

export default Home;
