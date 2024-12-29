import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowDropDown, MdDelete, MdEdit, MdMoreVert, MdSearch } from 'react-icons/md';
import UpdateRental from './UpdateRentalItem';
import { Link } from 'react-router-dom';

const RentalItemsTable = ({ rentals, refetch }) => {
 

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalsPerPage, setRentalsPerPage] = useState(5);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/rental/${id}`, {withCredentials: true}),
    onSuccess: () => {
      toast.success('Product deleted successfully!');
      queryClient.invalidateQueries(['products']);
      refetch();
    },
    onError: (error) => {
      console.error('Failed to delete product:', error.message);
    },
  });


  const handleDelete = (id) => {
    deleteMutation.mutate(id)
  };

  

  const filteredRentals = rentals.filter((rental) => (rental.name.toLowerCase().includes(searchTerm.toLowerCase()) || rental.location.toLowerCase().includes(searchTerm.toLowerCase())) && (statusFilter === 'All' || rental.status === statusFilter));

  const indexOfLastRentals = currentPage * rentalsPerPage;
  const indexOfFirstRentals = indexOfLastRentals - rentalsPerPage;
  const currentRentals = filteredRentals.slice(indexOfFirstRentals, indexOfLastRentals);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, rentalsPerPage]);

  return (
    <div className='container mx-auto p-2 md:p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Rentals ({rentals?.length})</h1>
      <div className='mb-4 flex flex-wrap items-center justify-between'>
        <div className='w-full md:w-1/3 mb-4 md:mb-0'>
          <div className='relative'>
            <input type='text' placeholder='Search here...' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <MdSearch className='absolute right-3 top-3 text-gray-400' />
          </div>
        </div>
        <div className='w-full md:w-1/3 mb-4 md:mb-0'>
          <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value='All'>All Statuses</option>
            <option value='available'>Available</option>
            <option value='rented'>Rented</option>
          </select>
        </div>
        <div className='w-full md:w-1/3'>
          <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={rentalsPerPage} onChange={(e) => setRentalsPerPage(Number(e.target.value))}>
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
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Location</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Category</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Price</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Discount</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRentals.map((rental) => (
              <tr key={rental._id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 w-10 h-10'>
                      <img className='w-full h-full rounded-full' src={rental?.images[0]} alt='' />
                    </div>
                    <div className='ml-3'>
                      <p className='text-gray-900 whitespace-no-wrap'>{rental?.name}</p>
                    </div>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{rental.location}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{rental?.category}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{rental?.price}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{rental?.discount}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  {/* <div className='relative inline-block w-full'>
                    <select
                      value={rental.status}
                      onChange={(e) => handleStatusChange(rental._id, e.target.value)}
                      className={`appearance-none w-full border-none bg-transparent  py-1 rounded-full font-semibold focus:outline-none ${rental.status === 'available' ? 'text-green-600' : rental.status === 'rented' ? 'text-red-600' : 'text-yellow-600'}`}
                    >
                      <option value='available'>Available</option>
                      <option value='rented'>Rented</option>
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <MdArrowDropDown />
                    </div>
                  </div> */}
                  {rental.status}
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center space-x-4'>
                    <button className='text-blue-600 hover:text-blue-900'>
                      <Link to={`edit_rental/${rental._id}`}>
                        <MdEdit className='w-5 h-5' />
                      </Link>
                    </button>
                    <button onClick={() => handleDelete(rental._id)} className='text-red-600 hover:text-red-900'>
                      <MdDelete className='w-5 h-5' />
                    </button>
                    <button className='text-gray-600 hover:text-gray-900'>
                      <MdMoreVert className='w-5 h-5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex flex-wrap items-center justify-between'>
        <div className='w-full sm:w-auto mb-4 sm:mb-0'>
          <p className='text-sm text-gray-700'>
            Showing {indexOfFirstRentals + 1} to {Math.min(indexOfLastRentals, filteredRentals.length)} of {filteredRentals.length} rentals
          </p>
        </div>
        <div className='w-full sm:w-auto'>
          <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
            {Array.from({ length: Math.ceil(filteredRentals.length / rentalsPerPage) }).map((_, index) => (
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

export default RentalItemsTable;
