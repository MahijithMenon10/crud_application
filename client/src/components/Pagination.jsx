import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setPage } from '../features/data/dataSlice.js';

export function CircularPagination() {
  const page = useSelector((state) => state.data.page);
  const totalPages = useSelector((state) => state.data.totalPages);
  const dispatch = useDispatch();
  console.log(totalPages);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageClick = (event) => {
    dispatch(setPage(event.selected));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3} // Number of pages displayed in the middle
      marginPagesDisplayed={1} // Number of pages displayed at the beginning and end
      pageCount={totalPages}
      previousLabel="prev"
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center mt-4"
      pageClassName="mx-1 px-3 py-2 border border-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
      activeClassName="bg-blue-500 text-white"
      previousClassName="mx-1 px-3 py-2 border border-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
      nextClassName="mx-1 px-3 py-2 border border-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
      breakClassName="mx-1 px-3 py-2 border border-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
    />
  );
}
