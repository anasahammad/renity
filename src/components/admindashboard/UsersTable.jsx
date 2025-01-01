import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdArrowDropDown, MdDelete, MdEdit, MdMoreVert, MdSearch } from 'react-icons/md';
import axiosInstance from '../../hooks/axiosInstance';
import Modal from '../Modal';

const UsersTable = ({ users, refetch }) => {
  const [metaData, setMetaData] = useState([]);
  const [metaLoading, setMetaLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);

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
    mutationFn: ({ id, newStatus }) => axiosInstance.put(`/admin/users/${id}`, newStatus),
    onSuccess: () => {
      toast.success('Users status updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to update:', error.message);
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleStatusChange = (id, newStatus) => {
    updateMutation.mutate({ id, newStatus: { status: newStatus } });
  };

  // get user meta data
  const getUserMetaData = async (id) => {
    try {
      setMetaLoading(true);
      const response = await axiosInstance.get(`/admin/users/${id}/metadata`);
      setMetaData(response.data.data);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setMetaLoading(false);
    }
  };

  const filteredUsers = users.filter((user) => (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase())) && (statusFilter === 'All' || user.status === statusFilter));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, usersPerPage]);

  const updateVerification = useMutation({
    mutationFn: ({ id, isVarified }) => axiosInstance.put(`/admin/users/${id}`, isVarified), // Pass the state as an object
    onSuccess: () => {
      toast.success('User verification status updated successfully!');
      refetch(); // Refetch your data
    },
    onError: (error) => {
      toast.error('Failed to update user verification status.');
      console.error('Error:', error.message);
    },
  });

  const handleVerify = (id, newStatus) => {
    // setIsVarified(true)
    updateVerification.mutate({ id, isVarified: { isVarified: newStatus === 'true' ? true : false } });
  };
  return (
    <>
      <div className='container mx-auto p-2 md:p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Users ({users?.length})</h1>
        <div className='mb-4 flex flex-wrap items-center justify-between'>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search users...'
                className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch className='absolute right-3 top-3 text-gray-400' />
            </div>
          </div>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <select
              className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value='All'>All Statuses</option>
              <option value='active'>Active</option>
              <option value='disable'>Disabled</option>
            </select>
          </div>
          <div className='w-full md:w-1/3'>
            <select
              className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
              value={usersPerPage}
              onChange={(e) => setUsersPerPage(Number(e.target.value))}
            >
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
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Role</th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Is Verified</th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
                <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div
                      className='flex items-center cursor-pointer'
                      onClick={() => {
                        setOpen(!open);
                        getUserMetaData(user._id);
                      }}
                    >
                      <div className='flex-shrink-0 w-10 h-10'>
                        <img
                          className='w-full h-full rounded-full'
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                          alt=''
                        />
                      </div>
                      <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{user.email}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <p className='text-gray-900 whitespace-no-wrap'>{user.role}</p>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    {/* <p className='text-gray-900 whitespace-no-wrap'>{user.isVerified ? 'True': 'False'}</p> */}
                    {/* <input type='checkbox' className='px-5 py-5' checked={user?.isVarified} onChange={() => handleVerify(user._id)} /> */}

                    <select
                      value={user.isVarified}
                      onChange={(e) => handleVerify(user._id, e.target.value)}
                      name=''
                      id=''
                    >
                      <option value={true}>True</option>
                      <option value={false}>False</option>
                    </select>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='relative inline-block w-full'>
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                        className={`appearance-none w-full border-none bg-transparent  py-1 rounded-full font-semibold focus:outline-none ${user.status === 'active' ? 'text-green-600' : user.status === 'disabled' ? 'text-red-600' : 'text-yellow-600'}`}
                      >
                        <option value='active'>Active</option>
                        <option value='disable'>Disabled</option>
                      </select>
                      <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                        <MdArrowDropDown />
                      </div>
                    </div>
                  </td>
                  <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <div className='flex items-center space-x-4'>
                      <button
                        onClick={() => handleEdit(user._id)}
                        className='text-blue-600 hover:text-blue-900'
                      >
                        <MdEdit className='w-5 h-5' />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className='text-red-600 hover:text-red-900'
                      >
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
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </p>
          </div>
          <div className='w-full sm:w-auto'>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === index + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Show user meta data Modal */}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setMetaData([]);
        }}
      >
        {metaLoading ? (
          <div>Loading</div>
        ) : (
          <div className=' w-96 overflow-y-auto max-h-[80vh]'>
            {/* user meta data show  */}
            <div className='space-y-3'>
              {metaData?.map((meta, index) => (
                <div key={meta._id}>
                  <span className='mb-2 inline-block'>
                    {++index}. {meta.key}
                  </span>
                  <img
                    src={meta.value}
                    alt={meta.key}
                    className='size-32 object-cover cursor-pointer'
                    onClick={() => window.open(meta.value, '_blank')}
                  />
                </div>
              ))}
            </div>
            <div className='flex gap-4 py-2'>
              <button
                className='btn rounded border p-1 w-full'
                onClick={() => {
                  setOpen(false);
                  setMetaData([]);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setMetaData([]);
                }}
                className='btn bg-[#FF4D30] rounded p-1 w-full'
              >
                OK
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UsersTable;
