import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../features/data/dataSlice.js';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Modal from 'react-modal';
import { CircularPagination } from '../components/Pagination.jsx';
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status, error } = useSelector((state) => state.data);
  const [isOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '75%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '200px',
    },
  };
  return (
    <div className="">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        type="button"
        onClick={() => navigate('/view/new')}
      >
        Add Users
      </button>

      <div className="flex flex-wrap justify-between">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
          placeholder="Search by name..."
        />

        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-red-900 flex-auto m-2"
          placeholder="Search by email..."
        />

        <select className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2">
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <select className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 flex-auto"
          type="button"
        >
          Search
        </button>
      </div>
      <div className="flex justify-end my-4">
        <h1 className="text-3xl font-semibold text-center my-4">
          Consumer Data
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact No
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.name}</div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.email}</div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.phoneNumber}
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.status + ''}
                    </div>
                  </td>
                  <td className="whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => setIsOpen((prev) => !prev)}>
                      <BsThreeDotsVertical />
                    </button>
                    <Modal
                      isOpen={isOpen}
                      style={customStyles}
                      onRequestClose={() => console.log('close')}
                    >
                      <div className="flex flex-col">
                        <button
                          className="text-red-500"
                          onClick={() => navigate(`/view/${item._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => navigate(`/view/${item._id}`)}
                        >
                          Delete
                        </button>
                      </div>
                    </Modal>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <CircularPagination />
        </table>
      </div>
    </div>
  );
};

export default Home;
