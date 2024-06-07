import { useDispatch, useSelector } from 'react-redux';
import { addUsers, fetchUserById } from '../features/user/userSlice';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  about: Yup.string().required('Required'),
  phonenumber: Yup.string().required('Required'),
  dob: Yup.string().required('Required'),
  status: Yup.string().required('Required'),
});

const UserFormView = ({ id }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => (state.user ? state.user.user : null));

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(id));
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
        status: user ? user.status : '',
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(addUsers(JSON.stringify(values)));
        setSubmitting(false);
      }}
    >
      {({ values }) => (
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1>Create User</h1>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <Field
              name="name"
              type="text"
              placeholder="name"
              value={values.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="name" component="div" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <Field
              name="email"
              type="email"
              placeholder="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="about"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              About
            </label>
            <Field
              name="about"
              type="text"
              placeholder="about"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="about" component="div" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phonenumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <Field
              name="phonenumber"
              type="text"
              placeholder="phone number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="phonenumber" component="div" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dob"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date of Birth
            </label>
            <Field
              name="dob"
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="dob" component="div" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Status
            </label>
            <Field
              as="select"
              name="status"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </Field>
            <ErrorMessage name="status" component="div" />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add User
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UserFormView;
