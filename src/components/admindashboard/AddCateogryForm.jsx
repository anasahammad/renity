import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddCategoryForm = ({ refetch }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState(null);
  const [previewIcon, setPreviewIcon] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const createMutation = useMutation({
    mutationFn: (formData) => axiosInstance.post(`/admin/category`, formData),
    onSuccess: () => {
      toast.success('Category added successfully!');
      refetch();
      setName('');
      setIcon(null);
      setPreviewIcon('');
    },
    onError: (error) => {
      console.error('Failed to add category:', error.message);
      toast.error('Failed to add category. Please try again.');
    },
  });

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rowshanara'); // Replace with your upload preset

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drbtvputr/image/upload`, // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw error;
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setPreviewIcon(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let iconUrl = '';
      if (icon) {
        iconUrl = await uploadToCloudinary(icon);
      }

      const formData = {
        name,
        icon: iconUrl,
      };

      createMutation.mutate(formData);
    } catch (error) {
      console.error('Error during form submission:', error);
      toast.error('Failed to upload icon. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-3 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Category Name
          </label>
          <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
        </div>
        <div className='mb-4'>
          <label htmlFor='icon' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Category Icon
          </label>
          <div className='flex items-center justify-center w-full'>
            <label htmlFor='icon' className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'>
              {previewIcon ? (
                <img src={previewIcon || '/placeholder.svg'} alt='Category Icon' className='w-full h-full object-contain' />
              ) : (
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <FaCloudUploadAlt className='w-10 h-10 mb-3 text-gray-400' />
                  <p className='mb-2 text-sm text-gray-500'>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                  <p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
              )}
              <input type='file' id='icon' onChange={handleIconChange} className='hidden' accept='image/*' />
            </label>
          </div>
        </div>

        <div className='mt-6'>
          <button type='submit' className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md disabled:opacity-50' disabled={isUploading || createMutation.isLoading}>
            {isUploading ? 'Uploading...' : createMutation.isLoading ? 'Adding Category...' : 'Add Category'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
