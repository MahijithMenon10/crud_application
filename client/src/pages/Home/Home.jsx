// Desc: Home page component
// Home Component where all the users are displayed in a table format. The user can view, edit, and delete the user from this page. The user can also change the status of the user from active to inactive and vice versa.
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
import Header from '../../components/Header';
import { toast } from 'react-toastify';
const Home = () => {
  const dispatch = useDispatch();
  const isFetchingUsers = useSelector((state) => state.data.isFetchingUsers);
  const [loadingIds, setLoadingIds] = useState([]);
  const countDocuments = useSelector((state) => state.data.countDocuments);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data } = useSelector((state) => state.data);
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(null);

  const page = useSelector((state) => state.data.page);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async () => {
    setModalIsOpen(false);
    dispatch(deleteUser(selectedId))
      .unwrap()
      .then(() => {
        toast.success('User deleted successfully');
      })
      .catch((err) => {
        toast.error('Failed to delete user : ' + err.message);
      });
  };
  const handleSwitchChange = (userId) => (checked) => {
    setLoadingIds((prevIds) => [...prevIds, userId]);
    dispatch(updateStatus({ id: userId, status: checked }))
      .unwrap()
      .then(() => {
        setLoadingIds((prevIds) => prevIds.filter((id) => id !== userId));
      })
      .catch((err) => {
        setLoadingIds((prevIds) => prevIds.filter((id) => id !== userId));
        toast.error('Failed to update status : ' + err.message);
      });
  };

  const handleView = (id) => {
    navigate(`/viewuser/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

  useEffect(() => {
    const filters = {
      name: searchParams.get('name') || '',
      email: searchParams.get('email') || '',
      status: searchParams.get('status') || '',
      date: searchParams.get('date') || '',
      page: searchParams.get('page') || 1,
    };
    dispatch(fetchUsers(filters));
  }, [dispatch, page]);

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

  return (
    <>
      <div className="p-4">
        <Header />
        <div className="flex flex-col items-center my-4">
          <h1 className="text-3xl font-semibold text-center my-4">
            Total Data :{' ' + data.length}
          </h1>
          {isFetchingUsers ? (
            <Loader />
          ) : (
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
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center">
                      No data
                    </td>
                  </tr>
                ) : (
                  data.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.email}
                          </div>
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
                                className="absolute bg-white shadow-lg p-4 z-10 right-12 top-45"
                              >
                                <p
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleView(item._id);
                                    isOpen(null);
                                  }}
                                >
                                  View
                                </p>
                                <p
                                  className="cursor-pointer"
                                  onClick={() => {
                                    handleEdit(item._id);
                                    isOpen(null);
                                  }}
                                >
                                  Edit
                                </p>
                                <p
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setModalIsOpen(true);
                                    setSelectedId(item._id);
                                    setIsOpen(null);
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
                              overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-5 flex items-center justify-center"
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
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
        <CircularPagination />
      </div>
    </>
  );
};

export default Home;
