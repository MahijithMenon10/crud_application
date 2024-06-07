// import Modal from 'react-modal';
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { deleteUsers } from '../features/data/dataSlice';

// const DeleteModal = ({ id }) => {
//   const [isOpen, setIsOpen] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleDelete = () => {
//     dispatch(deleteUsers(id));
//     navigate('/');
//   };

//   return (
//     <Modal isOpen={isOpen === id} onRequestClose={() => setIsOpen(null)}>
//       <div className="flex flex-col">
//         <h2>Are you sure you want to delete this item?</h2>
//         <button className="text-red-500" onClick={handleDelete}>
//           Confirm Delete
//         </button>
//         <button className="text-gray-500" onClick={() => setIsOpen(null)}>
//           Cancel
//         </button>
//       </div>
//     </Modal>
//   );
// };

// export default DeleteModal;
