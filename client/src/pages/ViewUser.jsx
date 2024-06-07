import { fetchUserById } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const ViewUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, status, error } = useSelector((state) => state.data);
  console.log(data);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <div className="flex flex-col items-start space-y-1 bg-white p-4 rounded shadow">
        <label className="font-bold text-lg">Name</label>
        <p className="text-gray-700">{data.name}</p>
      </div>
      <div className="flex flex-col items-start space-y-1 bg-white p-4 rounded shadow">
        <label className="font-bold text-lg">Email</label>
        <p className="text-gray-700">{data.email}</p>
      </div>
      <div className="flex flex-col items-start space-y-1 bg-white p-4 rounded shadow">
        <label className="font-bold text-lg">Phone</label>
        <p className="text-gray-700">{data.phoneNumber}</p>
      </div>
      <div className="flex flex-col items-start space-y-1 bg-white p-4 rounded shadow">
        <label className="font-bold text-lg">About</label>
        <p className="text-gray-700">{data.about}</p>
      </div>
      <div className="flex flex-col items-start space-y-1 bg-white p-4 rounded shadow">
        <label className="font-bold text-lg">Status</label>
        <p className="text-gray-700">{data.status + ''}</p>
      </div>
    </div>
  );
};

export default ViewUser;
