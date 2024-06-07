import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, setPage } from '../features/data/dataSlice.js';

export function CircularPagination() {
  const page = useSelector((state) => state.data.page);
  const totalPages = useSelector((state) => state.data.totalPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageClick = (event) => {
    dispatch(setPage(event.selected));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
    />
  );
}
