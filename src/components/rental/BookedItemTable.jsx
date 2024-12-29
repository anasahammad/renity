import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdMoreVert, MdSearch, MdArrowDropDown } from 'react-icons/md';
import axiosInstance from '../../hooks/axiosInstance';
import toast from 'react-hot-toast';

const BookedItemTable = ({ bookedItems, refetch }) => {

  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isVarified, setIsVarified] = useState(false);
  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/admin/users/${id}`),
    onSuccess: () => {
      toast.success('Product deleted successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to delete product:', error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, newStatus }) => axiosInstance.put(`/book/${id}`, newStatus),
    onSuccess: () => {
      toast.success(' Status updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to delete product:', error.message);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleStatusChange = (id, newStatus) => {
    updateMutation.mutate({ id, newStatus: { status: newStatus } });
  };


  const filteredBookedItem = bookedItems.filter((booked) => statusFilter === 'All' || booked.status === statusFilter);

  const indexOfItems = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfItems - itemsPerPage;
  const currentItems = filteredBookedItem.slice(indexOfFirstItem, indexOfItems);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [ statusFilter, itemsPerPage]);

  const updateVerification = useMutation({
    mutationFn: ({ id, isVarified }) => axiosInstance.put(`/admin/users/${id}`, { isVarified }), // Pass the state as an object
    onSuccess: () => {
      toast.success('User verification status updated successfully!');
      refetch(); // Refetch your data
    },
    onError: (error) => {
      toast.error('Failed to update user verification status.');
      console.error('Error:', error.message);
    },
  });

  const handleVerify = (id) => {
    setIsVarified(true);
    updateVerification.mutate({ id, isVarified: !isVarified });
  };
  return (
    <div className='container mx-auto p-2 md:p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Users ({bookedItems?.length})</h1>
      <div className='mb-4 flex flex-wrap items-center justify-between'>
        {/* <div className='w-full md:w-1/3 mb-4 md:mb-0'>
          <div className='relative'>
            <input type='text' placeholder='Search users...' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <MdSearch className='absolute right-3 top-3 text-gray-400' />
          </div>
        </div> */}
        <div className='w-full md:w-1/3 mb-4 md:mb-0'>
          <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value='All'>All Statuses</option>
            <option value='completed'>Completed</option>
            <option value='pending'>Pending</option>
            <option value='confirm'>Confirm</option>
            <option value='rejected'>Rejected</option>
          </select>
        </div>
        <div className='w-full md:w-1/3'>
          <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
      </div>
      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Name</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Email</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Rental Name</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Rental Price</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Booking Date</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
              {/* <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((booked) => (
              <tr key={booked.id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booked?.user?.name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booked.user.email}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booked.rental?.name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>{booked.rentalPrice}</td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {booked?.bookedDates.map((date) => (
                    <span key={date}>
                      {new Date(date).toLocaleDateString()}
                      <br />
                    </span>
                  ))}
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='relative inline-block w-full'>
                    <select
                      value={booked.status}
                      onChange={(e) => handleStatusChange(booked._id, e.target.value)}
                      className={`appearance-none w-full border-none bg-transparent py-1 rounded-full font-semibold focus:outline-none ${
                        booked.status === 'pending' ? 'text-yellow-600' : booked.status === 'confirm' ? 'text-blue-600' : booked.status === 'completed' ? 'text-green-600' : booked.status === 'rejected' ? 'text-red-600' : 'text-gray-600'
                      }`}
                    >
                      <option value='pending'>Pending</option>
                      <option value='confirm'>Confirm</option>
                      <option value='completed'>Completed</option>
                      <option value='rejected'>Rejected</option>
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 -right-4 flex items-center px-2 text-gray-700'>
                      <MdArrowDropDown />
                    </div>
                  </div>
                </td>
                {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center space-x-4'>
                    <button onClick={() => handleEdit(booked._id)} className='text-blue-600 hover:text-blue-900'>
                      <MdEdit className='w-5 h-5' />
                    </button>
                    <button onClick={() => handleDelete(booked._id)} className='text-red-600 hover:text-red-900'>
                      <MdDelete className='w-5 h-5' />
                    </button>
                    <button className='text-gray-600 hover:text-gray-900'>
                      <MdMoreVert className='w-5 h-5' />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex flex-wrap items-center justify-between'>
        <div className='w-full sm:w-auto mb-4 sm:mb-0'>
          <p className='text-sm text-gray-700'>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfItems, filteredBookedItem.length)} of {filteredBookedItem.length} Items
          </p>
        </div>
        <div className='w-full sm:w-auto'>
          <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
            {Array.from({ length: Math.ceil(filteredBookedItem.length / itemsPerPage) }).map((_, index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default BookedItemTable;
