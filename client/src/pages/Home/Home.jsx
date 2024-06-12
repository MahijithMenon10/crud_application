import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Switch from 'react-switch';
import { useNavigate } from 'react-router-dom';
import { updateStatus } from '../../redux/actions/dataActions';
import { fetchUsers } from '../../redux/actions/dataActions';
import { deleteUser } from '../../redux/actions/userActions';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Modal from 'react-modal';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { CircularPagination } from '../../components/Pagination';
const Home = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.data);
  const [loadingIds, setLoadingIds] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useSelector((state) => state.data);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(null);

  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const [emailFilter, setEmailFilter] = useState(
    searchParams.get('email') || ''
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get('status') || ''
  );
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    setModalIsOpen(false);
    dispatch(deleteUser(selectedId));
    dispatch(fetchUsers());
  };
  const handleSwitchChange = (userId) => (checked) => {
    setLoadingIds((prevIds) => [...prevIds, userId]);
    dispatch(updateStatus({ id: userId, status: checked }))
      .unwrap()
      .then(() => {
        setLoadingIds((prevIds) => prevIds.filter((id) => id !== userId));
      });
  };

  const handleView = (id) => {
    navigate(`/viewuser/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  useEffect(() => {
    const name = searchParams.get('name') || '';
    const email = searchParams.get('email') || '';
    const status = searchParams.get('status') || '';
    const date = searchParams.get('date') || '';
    const page = searchParams.get('page') || '1';

    dispatch(fetchUsers({ name, email, status, date, page }));
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    let filters = {
      name: nameFilter || '',
      email: emailFilter || '',
      status: statusFilter || '',
      date: dateFilter || '',
    };
    let queryParams = new URLSearchParams(filters).toString();

    navigate(`?${queryParams}`);
    setSearchParams(filters);
  };
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
            type="button"
            onClick={() => navigate('/addUser')}
          >
            Add User
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
              onClick={() => handleSearch()}
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
                        {loadingIds.includes(item._id) ? (
                          <Loader />
                        ) : (
                          <Switch
                            onChange={handleSwitchChange(item._id)}
                            checked={item.status}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => setIsOpen(item._id)}>
                        <BsThreeDotsVertical />
                      </button>
                      <>
                        {isOpen === item._id && (
                          <div
                            ref={dropdownRef}
                            className="absolute bg-white shadow-lg p-4"
                          >
                            <p onClick={() => handleView(item._id)}>View</p>
                            <p onClick={() => handleEdit(item._id)}>Edit</p>
                            <p
                              onClick={() => {
                                setModalIsOpen(true);
                                setSelectedId(item._id);
                              }}
                            >
                              Delete
                            </p>
                          </div>
                        )}
                        <Modal
                          isOpen={modalIsOpen}
                          ariaHideApp={false}
                          onRequestClose={() => setModalIsOpen(false)}
                          contentLabel="Delete Confirmation"
                          className="flex items-center justify-center outline-none"
                          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                        >
                          <div className="bg-white rounded-lg px-8 pt-6 pb-8 mb-4">
                            <h2 className="block text-gray-700 text-xl font-bold mb-2">
                              Confirm Delete
                            </h2>
                            <p className="mb-6 text-gray-700 text-base">
                              Are you sure you want to delete this item?
                            </p>
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => setModalIsOpen(false)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                No
                              </button>
                              <button
                                onClick={handleDelete}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              >
                                Yes
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <CircularPagination />
      </div>
    </>
  );
};

export default Home;
