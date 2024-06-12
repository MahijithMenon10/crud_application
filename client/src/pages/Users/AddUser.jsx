import { useDispatch, useSelector } from 'react-redux';
import { addUsers, updateUsers } from '../../redux/actions/dataActions';
import { fetchUserById } from '../../redux/actions/userActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  about: Yup.string().required('Required'),
  phonenumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  dob: Yup.date()
    .required('Required')
    .max(new Date(), 'DOB must be before today'),
  status: Yup.string().required('Required'),
});

const UserFormView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => (state.user ? state.user.user : null));

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
      console.log(id);
    }
  }, [id, dispatch]);

  return (
    <Formik
      initialValues={{
        name: user ? user.name : '',
        email: user ? user.email : '',
        about: user ? user.about : '',
        phonenumber: user ? user.phonenumber : '',
        dob: user ? user.dob : '',
        status: user ? user.status : true,
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if (id) {
          dispatch(updateUsers(id, JSON.stringify(values))); // if id exists, update the user
        } else {
          dispatch(addUsers(JSON.stringify(values))); // if id doesn't exist, add a new user
        }
        setSubmitting(false);
        navigate('/');
      }}
    >
      {({ values }) => (
        <Form className="bg-white shadow-md rounded-lg p-8 space-y-6 max-w-lg mx-auto">
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Add A User
          </h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <Field
                name="name"
                type="text"
                placeholder="name"
                value={values.name}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="name" component="div" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="email"
                value={values.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="email" component="div" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="about"
                className="block text-gray-700 font-medium"
              >
                About
              </label>
              <Field
                name="about"
                type="text"
                placeholder="about"
                value={values.about}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="about" component="div" />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="phonenumber"
                className="block text-gray-700 font-medium"
              >
                Phone Number
              </label>
              <Field
                name="phonenumber"
                type="text"
                placeholder="phone number"
                value={values.phonenumber}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="phonenumber" component="div" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="dob" className="block text-gray-700 font-medium">
                Date of Birth
              </label>
              <Field
                name="dob"
                type="date"
                value={values.dob}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <ErrorMessage name="dob" component="div" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-gray-700 font-medium"
              >
                Status
              </label>

              <Field
                name="status"
                as="select"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </Field>
              <ErrorMessage name="status" component="div" />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-3/4 md:w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {id ? 'Update User' : 'Add User'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserFormView;
