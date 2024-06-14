import { useDispatch, useSelector } from 'react-redux';
import { addUsers, updateUsers } from '../../redux/actions/dataActions';
import { fetchUserById } from '../../redux/actions/userActions';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import BackButton from '../../components/BackButton';
import { useEffect } from 'react';
import { clearUser } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';

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
    .max(50, 'About should have a limit of 50 characters'),
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
      dispatch(fetchUserById(id));
    } else {
      dispatch(clearUser());
    }
  }, [id, dispatch]);

  return (
    <>
      <BackButton />
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
                if (JSON.stringify(values[key]) !== JSON.stringify(user[key])) {
                  acc[key] = values[key];
                }
                return acc;
              }, {});
              console.log('Changes:', changes);
              dispatch(updateUsers({ id, changes }))
                .unwrap()
                .then(() => {
                  toast.success('User updated successfully');
                  dispatch(clearUser());
                  setSubmitting(false);
                  navigate('/');
                })
                .catch((err) => {
                  toast.error('Failed to update user ' + err.message);
                });
            } else {
              dispatch(addUsers(JSON.stringify(values)))
                .unwrap()
                .then(() => {
                  toast.success('User added successfully');
                  dispatch(clearUser());
                  setSubmitting(false);
                  navigate('/');
                })
                .catch((err) => {
                  toast.error('Failed to add user ' + err.message);
                });
            }
          } catch (error) {
            console.error('Failed to update or add user:', error);
          }
        }}
      >
        {({ values }) => (
          <>
            <div className="min-h-screen flex justify-center items-center">
              <Form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-center text-3xl font-bold my-5">
                  {id ? 'Update' : 'Add'} A User
                </h1>
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase m-4 tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <Field
                      id="name"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block uppercase m-4 tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  <div className="w-full md:w-1/2 px-3 ">
                    <label
                      className="block uppercase tracking-wide m-4 text-gray-700 text-xs font-bold mb-2"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />

                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide m-4 text-gray-700 text-xs font-bold mb-2"
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="w-full px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide m-4 text-gray-700 text-xs font-bold mb-2"
                      htmlFor="about"
                    >
                      About
                    </label>
                    <Field
                      name="about"
                      id="about"
                      as="textarea"
                      placeholder="about"
                      value={values.about}
                      className="shadow appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                    />
                    <ErrorMessage
                      name="about"
                      component="div"
                      className="text-red-500 text-xs italic"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mb-6 ml-2 md:mb-0">
                    <label
                      className="block uppercase tracking-wide m-4 text-gray-700 text-xs font-bold mb-2"
                      htmlFor="status"
                    >
                      Status
                    </label>
                    <Field
                      name="status"
                      id="status"
                      as="select"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {id ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </Form>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default UserFormView;
