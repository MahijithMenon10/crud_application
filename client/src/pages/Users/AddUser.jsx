import { useDispatch, useSelector } from 'react-redux';
import { addUsers, updateUsers } from '../../redux/actions/dataActions';
import { fetchUserById } from '../../redux/actions/userActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect } from 'react';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .matches(/^(\w+\s?){0,2}\w+$/, 'Name should not have more than 2 spaces'),
  email: Yup.string()
    .required('Required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email address'
    )
    .matches(/^[^\s]*$/, 'Email should not have spaces'),
  about: Yup.string()
    .required('Required')
    .max(10, 'About should have a limit of 10 characters')
    .matches(/^(\w+\s?){0,3}\w+$/, 'About should not have more than 3 spaces'),
  phoneNumber: Yup.string()
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
      console.log(id);
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
        phoneNumber: user ? user.phoneNumber : '',
        dob: user ? new Date(user.dob).toISOString().split('T')[0] : '',
        status: user ? user.status : true,
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          if (id) {
            const changes = Object.keys(values).reduce((acc, key) => {
              if (values[key] !== user[key]) {
                acc[key] = values[key];
              }
              return acc;
            }, {});
            dispatch(updateUsers({ id: id, ...changes }));
          } else {
            dispatch(addUsers(JSON.stringify(values)));
            console.log(values);
          }
          setSubmitting(false);
          navigate('/');
        } catch (error) {
          console.error('Failed to update or add user:', error);
          // You can decide what to do in case of an error.
          // For example, you might want to show an error message to the user.
        }
      }}
    >
      {({ values }) => (
        <div className="min-h-screen flex justify-center items-center">
          <Form className="w-full max-w-lg">
            <div className="flex gap-6 mb-6">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  {' '}
                  Name
                </label>
                <Field
                  id="name"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  onInput={(event) => {
                    if (event.target.value.length > 20) {
                      event.target.value = event.target.value.slice(0, 20);
                    }
                  }}
                  value={values.name}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Doe@example.com"
                  value={values.email}
                  onInput={(event) => {
                    if (event.target.value.length > 20) {
                      event.target.value = event.target.value.slice(0, 40);
                    }
                  }}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            <div className="flex justify-between gap-6 w-full mb-6 md:mb-0">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <Field
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  placeholder="98XXXX7899"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      ''
                    );
                    if (event.target.value.length > 10) {
                      event.target.value = event.target.value.slice(0, 10);
                    }
                  }}
                  value={values.phoneNumber}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />

                <ErrorMessage
                  name="phonenumber"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="dob"
                >
                  Date of Birth
                </label>
                <Field
                  name="dob"
                  type="date"
                  value={values.dob}
                  max={new Date().toISOString().split('T')[0]}
                  min="1900-01-01"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            <div className="flex gap-6 mb-2">
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="about"
                >
                  About
                </label>
                <Field
                  name="about"
                  id="about"
                  type="text"
                  placeholder="about"
                  value={values.about}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>

              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                {' '}
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <Field
                  name="status"
                  id="status"
                  as="select"
                  className="appearance-none block w-64 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {id ? 'Update User' : 'Add User'}
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default UserFormView;
