import { fetchUserById } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ViewUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userState = useSelector((state) => state.user);

  const { user, status, error } = userState || {};

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col items-start space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md lg:max-w-lg">
        <h1 className="font-bold text-2xl text-blue-500">User Details</h1>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Name</label>
          <p className="text-gray-600">{user.name}</p>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Email</label>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Phone</label>
          <p className="text-gray-600">{user.phoneNumber}</p>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">About</label>
          <p className="text-gray-600">{user.about}</p>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Status</label>
          <p className="text-gray-600">{user.status ? 'Active' : 'Inactive'}</p>
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">DOB</label>
          <p className="text-gray-600">
            {new Date(user.dob).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
