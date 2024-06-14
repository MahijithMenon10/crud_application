// view user is implemented in the client/src/pages/Users/ViewUser.jsx file.
// The ViewUser component fetches a user by their ID and displays the user's details.
// The user's details include their name, email, phone number, about, and date of birth.
import { fetchUserById } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import userprofile from '../../assets/userprofile.png';
import BackButton from '../../components/BackButton';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
const ViewUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const userState = useSelector((state) => state.user);
  const isUserLoadingById = userState.isUserLoadingById;

  const { user } = userState || {};

  useEffect(() => {
    dispatch(fetchUserById(id))
      .unwrap()
      .then(() => {
        //
      })
      .catch((err) => {
        toast.error('Failed to delete user : ' + err.message);
      });
  }, [dispatch, id]);

  if (isUserLoadingById) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <BackButton />
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md lg:max-w-lg p-8 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-24 w-24 rounded-full overflow-hidden">
            <img
              src={userprofile}
              alt="User profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-blue-500">{user.name}</h1>
            <p className="text-gray-600">
              {user.status ? 'Active' : 'Inactive'}
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label className="font-bold text-lg text-gray-700">Email</label>
            <p className="text-gray-600 border p-2 rounded">{user.email}</p>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-bold text-lg text-gray-700">Phone</label>
            <p className="text-gray-600 border p-2 rounded">
              {user.phoneNumber}
            </p>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-bold text-lg text-gray-700">About</label>
            <textarea
              className="text-gray-600 border p-2 rounded resize-none"
              maxLength="50"
              readOnly
            >
              {user.about}
            </textarea>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-bold text-lg text-gray-700">DOB</label>
            <p className="text-gray-600 border p-2 rounded">
              {new Date(user.dob).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
