import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';

const UpdateCategoryForm = ({ refetch, editableCategory }) => {
 
  const updateMutation = useMutation({
    mutationFn: (formData) => axiosInstance.put(`/admin/category/${editableCategory?._id}`, formData),
    onSuccess: () => {
      toast.success('Category updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to update category:', error.message);
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      icon: e.target.icon.value
    };
    console.log('Form data:', formData);
    updateMutation.mutate(formData);
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Update Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Category Name
          </label>
          <input type='text' id='name' name='name' defaultValue={editableCategory?.name} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
        </div>
        <div className='mb-4'>
          <label htmlFor='icon' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Category Icon Link
          </label>
          <input type='text' id='icon' name='icon' defaultValue={editableCategory?.icon} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
        </div>

        <div className='mt-6'>
          <button type='submit' className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md '>
            Update Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategoryForm;
