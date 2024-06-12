import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setPage } from '../redux/slices/dataSlice';
export function CircularPagination() {
  const navigate = useNavigate();
  const totalPages = useSelector((state) => state.data.totalPages);
  const dispatch = useDispatch();

  const handlePageClick = (event) => {
    dispatch(setPage(event.selected + 1));
    navigate(`?page=${event.selected + 1}`);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      containerClassName="flex justify-center my-4 space-x-2"
      pageClassName="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200"
      activeLinkClassName="bg-blue-500 text-white"
      breakClassName="w-8 h-8 flex items-center justify-center border border-gray-300 rounded"
      nextClassName="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200"
      previousClassName="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-200"
      previousLinkClassName="block w-full h-full flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white"
      nextLinkClassName="block w-full h-full flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white"
      pageLinkClassName="block w-full h-full flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white"
      activeClassName="bg-blue-500 text-white"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
}
