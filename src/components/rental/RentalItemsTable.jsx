import { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdMoreVert, MdSearch, MdArrowDropDown } from 'react-icons/md';

const RentalItemsTable = ({rentals}) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Disabled' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Disabled' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', status: 'Active' },
    { id: 6, name: 'Eva Wilson', email: 'eva@example.com', status: 'Disabled' },
    { id: 7, name: 'Frank Miller', email: 'frank@example.com', status: 'Active' },
    { id: 8, name: 'Grace Lee', email: 'grace@example.com', status: 'Pending' },
    { id: 9, name: 'Henry Taylor', email: 'henry@example.com', status: 'Active' },
    { id: 10, name: 'Ivy Clark', email: 'ivy@example.com', status: 'Disabled' },
    { id: 11, name: 'Jack Robinson', email: 'jack@example.com', status: 'Active' },
    { id: 12, name: 'Karen White', email: 'karen@example.com', status: 'Disabled' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [rentalsPerPage, setRentalsPerPage] = useState(5);

  const handleEdit = (id) => {
    console.log(`Edit user with id: ${id}`);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)));
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
            <input type='text' placeholder='Search users...' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                  <div className='relative inline-block w-full'>
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
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center space-x-4'>
                    <button onClick={() => handleEdit(rental._id)} className='text-blue-600 hover:text-blue-900'>
                      <MdEdit className='w-5 h-5' />
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
