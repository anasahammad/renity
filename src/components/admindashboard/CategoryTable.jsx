import { useState } from 'react';
import { MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import Modal from '../Modal';

import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';
import CategoryForm from './CategoryForm';

const CategoryTable = ({ refetch, categories }) => {
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/admin/category/${id}`),
    onSuccess: () => {
      toast.success('Category deleted successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to delete category:', error.message);
    },
  });
  const handleEdit = (id) => {};
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  return (
    <div className='container mx-auto p-2 md:p-6'>
      <div className='flex justify-end'>
        <button onClick={() => setOpen(true)} className='py-2 px-4 bg-[#FF4D30] text-white rounded'>
          Add Category
        </button>
      </div>
      <h1 className='text-2xl font-semibold mb-4'>Categories ({categories?.length})</h1>
      {/* <div className='mb-4 flex flex-wrap items-center justify-between'>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <div className='relative'>
              <input type='text' placeholder='Search users...' className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <MdSearch className='absolute right-3 top-3 text-gray-400' />
            </div>
          </div>
          <div className='w-full md:w-1/3 mb-4 md:mb-0'>
            <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value='All'>All Statuses</option>
              <option value='active'>Active</option>
              <option value='disable'>Disabled</option>
            </select>
          </div>
          <div className='w-full md:w-1/3'>
            <select className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500' value={usersPerPage} onChange={(e) => setUsersPerPage(Number(e.target.value))}>
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
            </select>
          </div>
        </div> */}
      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Image</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Name</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Sub Categories</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex-shrink-0 w-10 h-10'>
                    <img className='w-full h-full rounded-full' src={`https://ui-avatars.com/api/?name=${category.name}&background=random`} alt='' />
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category.name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{category.subcategories?.length}</p>
                </td>

                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center space-x-4'>
                    <button onClick={() => handleEdit(category._id)} className='text-blue-600 hover:text-blue-900'>
                      <MdEdit className='w-5 h-5' />
                    </button>
                    <button onClick={() => handleDelete(category._id)} className='text-red-600 hover:text-red-900'>
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

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className=' w-96'>
          <CategoryForm refetch={refetch} />

          <div className='flex gap-4 py-2'>
            <button className='btn rounded border p-1 w-full' onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button onClick={() => setOpen(false)} className='btn bg-[#FF4D30] rounded p-1 w-full'>
              OK
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryTable;
