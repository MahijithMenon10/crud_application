import { fetchUserById } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const ViewUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userState = useSelector((state) => state.user);
  console.log(userState);
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
      <div className="flex flex-col items-start space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="font-bold text-2xl text-blue-500">User Details</h1>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Name</label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="text"
            value={user.name}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Email</label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="email"
            value={user.email}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Phone</label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="tel"
            value={user.phoneNumber}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">About</label>
          <textarea
            className="border border-gray-300 p-2 rounded-lg"
            value={user.about}
            readOnly
          />
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <label className="font-bold text-lg text-gray-700">Status</label>
          <input
            className="border border-gray-300 p-2 rounded-lg"
            type="text"
            value={user.status + ''}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
