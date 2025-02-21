import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';

const AddMetaDataForm = ({ refetch, setOpen }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rowshanara'); // Replace with your Cloudinary upload preset

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/drbtvputr/image/upload`, // Replace with your Cloudinary cloud name
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      setLoading(false);
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const createMutation = useMutation({
    mutationFn: (formData) => axiosInstance.post(`metadata/lessor`, formData),
    onSuccess: () => {
      toast.success('Metadata added successfully!');
      setOpen(false);
      refetch();
    },
    onError: (error) => {
      console.error('Failed to add metadata:', error.message);
      toast.error('Failed to add metadata');
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = value;

    if (image) {
      try {
        imageUrl = await uploadImage(image);
      } catch (error) {
        toast.error('Failed to upload image');
        console.log('Failed to upload image:', error);
        return;
      }
    }

    const formData = {
      key,
      value: imageUrl,
    };

    createMutation.mutate(formData);
  };

  return (
    <div className='max-w-2xl mx-auto p-3 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Add Meta Data</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='key'
            className='block text-sm font-medium text-gray-700 mb-1 text-left'
          >
            Select Your Document Type
          </label>
          <select
            id='key'
            placeholder='Example:...National Id'
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500'
            required
          >
            <option value=''>Select Document Type</option>
            <option value='National Id'>National Id</option>
            <option value='Passport'>Passport</option>
            <option value='Driving License'>Driving License</option>
            <option value='Utility Bill'>Utility Bill</option>
            <option value='Bank Statement'>Bank Statement</option>
            <option value='Other'>Other</option>
          </select>
        </div>
        <div className='mb-4 hidden'>
          <label
            htmlFor='value'
            className='block text-sm font-medium text-gray-700 mb-1 text-left'
          >
            Value or Image URL
          </label>
          <input
            type='text'
            id='value'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='image'
            className='block text-sm font-medium text-gray-700 mb-1 text-left'
          >
            Upload Document
          </label>
          <input
            type='file'
            id='image'
            accept='image/*'
            onChange={handleImageChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        {imagePreview && (
          <div className='mb-4 max-h-[300px] '>
            <img
              src={imagePreview}
              alt='Preview'
              className='max-w-full h-auto  max-h-[300px] object-cover object-center'
            />
          </div>
        )}
        <div className='mt-6'>
          <button
            type='submit'
            className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md hover:bg-[#FF3D20] transition-colors duration-300'
            disabled={createMutation.isLoading}
          >
            {loading ? 'Adding...' : 'Add Meta Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMetaDataForm;
