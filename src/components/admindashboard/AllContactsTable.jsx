import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdMoreVert, MdSearch, MdArrowDropDown } from 'react-icons/md';
import axiosInstance from '../../hooks/axiosInstance';
import toast from 'react-hot-toast';

const AllContactsTable = ({ contacts, refetch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [isVarified, setIsVarified] = useState(false);
  // const handleEdit = (id) => {
  //   console.log(`Edit user with id: ${id}`);
  // };

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/contact/${id}`),
    onSuccess: () => {
      toast.success('Contact message deleted successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to delete:', error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, newStatus }) => axiosInstance.put(`/contact/${id}`, newStatus),
    onSuccess: () => {
      toast.success('Users status updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to delete product:', error.message);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  

  const filteredUsers = contacts.filter((contact) => (contact?.name.toLowerCase().includes(searchTerm.toLowerCase()) || contact?.email.toLowerCase().includes(searchTerm.toLowerCase())));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, usersPerPage]);

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


  return (
    <div className='container mx-auto p-2 md:p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Messages ({contacts?.length})</h1>
      <div className='mb-4 flex flex-wrap items-center justify-between'>
        <div className='w-full md:w-1/3 mb-4 md:mb-0'>
          <div className='relative'>
            <input type='text' placeholder='Search users...' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <MdSearch className='absolute right-3 top-3 text-gray-400' />
          </div>
        </div>

        <div className='w-full md:w-1/3'>
          <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={usersPerPage} onChange={(e) => setUsersPerPage(Number(e.target.value))}>
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
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Phone</th>

              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Message</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((contact) => (
              <tr key={contact.id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0 w-10 h-10'>
                      <img className='w-full h-full rounded-full' src={`https://ui-avatars.com/api/?name=${contact.name}&background=random`} alt='' />
                    </div>
                    <div className='ml-3'>
                      <p className='text-gray-900 whitespace-no-wrap'>{contact.name}</p>
                    </div>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{contact.email}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{contact.phone}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{contact.message}</p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm '>
                  <div className='flex items-center space-x-4'>
                    {/* <button onClick={() => handleEdit(contact._id)} className='text-blue-600 hover:text-blue-900'>
                      <MdEdit className='w-5 h-5' />
                    </button> */}
                    <button onClick={() => handleDelete(contact._id)} className='text-red-600 hover:text-red-900'>
                      <MdDelete className='w-5 h-5' />
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
            Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} messages
          </p>
        </div>
        <div className='w-full sm:w-auto'>
          <nav className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px' aria-label='Pagination'>
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
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

export default AllContactsTable;
