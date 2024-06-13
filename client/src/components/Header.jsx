import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { fetchUsers } from '../redux/actions/dataActions';
import { useDispatch } from 'react-redux';

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
    dispatch(fetchUsers(filters));
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
        onClick={() => navigate('/addUser')}
      >
        Add User
      </button>

      <div className="flex ">
        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
          placeholder="Search by name..."
          value={nameFilter}
          name="name"
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />

        <input
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none text-red-900 flex-auto m-2"
          placeholder="Search by email..."
          value={emailFilter}
          name="email"
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        />

        <select
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
          value={statusFilter}
          name="status"
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <select
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none flex-auto m-2"
          value={dateFilter}
          name="date"
          onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
        >
          <option value="">All</option>
          <option value="Today">Today</option>
          <option value="this week">This Week</option>
          <option value="This month">This Month</option>
        </select>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 flex-auto"
          type="button"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
