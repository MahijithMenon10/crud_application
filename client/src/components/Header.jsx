// Header component that contains the search and filter inputs for the users list page
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { fetchUsers } from '../redux/actions/dataActions';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
      'Only contain letters and single spaces'
    )
    .max(20, 'Name should not exceed 20 characters')
    .trim(),
  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .matches(/^[^\s]*$/, 'No spaces allowed in email'),
  status: Yup.string(),
  date: Yup.string(),
});
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [nameFilter, setNameFilter] = useState(searchParams.get('name') || '');
  const [emailFilter, setEmailFilter] = useState(
    searchParams.get('email') || ''
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get('status') || ''
  );
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '');

  const handleSearch = () => {
    let filters = {
      name: nameFilter || '',
      email: emailFilter || '',
      status: statusFilter || '',
      date: dateFilter || '',
      page: 1,
    };
    let newSearchParams = new URLSearchParams();
    for (let key in filters) {
      newSearchParams.set(key, filters[key]);
    }
    setSearchParams(newSearchParams);
    dispatch(fetchUsers(filters))
      .unwrap()
      .then(() => {
        //
      })
      .catch((err) => {
        toast.error('Failed to fetch users: ', err.message);
      });
  };

  const handleClearFilters = (resetForm) => {
    dispatch(fetchUsers({ page: 1 }))
      .unwrap()
      .then(() => {
        setNameFilter('');
        setEmailFilter('');
        setStatusFilter('');
        setDateFilter('');
        let newSearchParams = new URLSearchParams();
        setSearchParams(newSearchParams);
        resetForm();
      })
      .catch((err) => {
        toast.error('Failed to fetch users: ', err.message);
      });
  };

  const handleFilterChange = (filterName, filterValue) => {
    switch (filterName) {
      case 'name':
        setNameFilter(filterValue);
        break;
      case 'email':
        setEmailFilter(filterValue);
        break;
      case 'status':
        setStatusFilter(filterValue);
        break;
      case 'date':
        setDateFilter(filterValue);
        break;
      default:
        break;
    }
    let newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(filterName, filterValue);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2"
        type="button"
      >
        Add User
      </button>

      <Formik
        initialValues={{
          name: nameFilter,
          email: emailFilter,
          status: statusFilter,
          date: dateFilter,
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form className="flex flex-row space-x-4">
            <div className="flex flex-col">
              <Field
                className=" p-2 border-2 w-auto m-5 h-10 border-gray-300 rounded-lg focus:outline-none"
                placeholder="Search by name..."
                name="name"
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.length > 20) {
                    value = value.slice(0, 20);
                  }
                  if (value.startsWith(' ')) {
                    value = value.trimStart();
                  }
                  value = value.replace(/\s\s+/g, ' ');
                  formik.handleChange({
                    target: {
                      name: e.target.name,
                      value: value,
                    },
                  });
                  handleFilterChange('name', value);
                }}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Field
                className="w-auto p-2 border-2 m-5   h-10 border-gray-300 rounded-lg focus:outline-none"
                placeholder="Search by email..."
                name="email"
                onChange={(e) => {
                  let value = e.target.value;
                  if (value.startsWith(' ')) {
                    value = value.trimStart();
                  }
                  value = value.replace(/\s/g, '');

                  if (value.length > 30) {
                    value = value.slice(0, 30);
                  }

                  formik.handleChange({
                    target: {
                      name: e.target.name,
                      value: value,
                    },
                  });
                  handleFilterChange('email', value);
                }}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Field
                as="select"
                className="w-full m-5 h-10 p-2 border-2 border-gray-300 rounded-lg focus:outline-none"
                name="status"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleFilterChange('status', e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="flex flex-col">
              <Field
                as="select"
                className="w-full  h-10 m-5 border-2 border-gray-300 rounded-lg focus:outline-none"
                name="date"
                onChange={(e) => {
                  formik.handleChange(e);
                  handleFilterChange('date', e.target.value);
                }}
              >
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="this week">This Week</option>
                <option value="This month">This Month</option>
              </Field>
              <ErrorMessage
                name="date"
                component="div"
                className="text-red-500 text-sm italic mt-2"
              />
            </div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2 flex-auto"
              type="button"
              onClick={() => handleClearFilters(formik.resetForm)}
            >
              Clear Filters
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 flex-auto"
              type="submit"
            >
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Header;
