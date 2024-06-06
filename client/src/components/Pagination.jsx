import { useEffect } from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { useSelector, useDispatch } from 'react-redux';

import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchUsers, setPage } from '../features/data/dataSlice.js';

export function CircularPagination() {
  const page = useSelector((state) => state.data.page);
  const totalPages = useSelector((state) => state.data.totalPages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(setPage(newPage));
      dispatch(fetchUsers(newPage));
    }
  };

  const getItemProps = (number) => ({
    onClick: () => changePage(number),
    variant: page === number ? 'filled' : 'text',
  });

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={() => changePage(page - 1)}
        disabled={page === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <IconButton key={i} {...getItemProps(i + 1)}>
            {i + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={() => changePage(page + 1)}
        disabled={page === totalPages}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
