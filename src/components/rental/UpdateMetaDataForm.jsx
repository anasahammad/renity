import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';

const UpdateMetaDataForm = ({ refetch, editableMetaData }) => {
  const [key, setKey] = useState(editableMetaData?.key || '');
  const [value, setValue] = useState(editableMetaData?.value || '');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(editableMetaData?.value || null);

  useEffect(() => {
    if (editableMetaData) {
      setKey(editableMetaData.key || '');
      setValue(editableMetaData.value || '');
      setImagePreview(editableMetaData.value || null);
    }
  }, [editableMetaData]);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'rowshanara');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/drbtvputr/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const updateMutation = useMutation({
    mutationFn: (formData) => axiosInstance.put(`metadata/lessor/${editableMetaData._id}`, formData),
    onSuccess: () => {
      toast.success('Metadata updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to update metadata:', error.message);
      toast.error('Failed to update metadata');
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
        return;
      }
    }

    const formData = {
      key,
      value: imageUrl,
    };

    updateMutation.mutate(formData);
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Update Meta Data</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='key' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Meta Data Field
          </label>
          <input type='text' id='key' value={key} onChange={(e) => setKey(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
        </div>
        <div className='mb-4'>
          <label htmlFor='value' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Value or Image URL
          </label>
          <input type='text' id='value' value={value} onChange={(e) => setValue(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        <div className='mb-4'>
          <label htmlFor='image' className='block text-sm font-medium text-gray-700 mb-1 text-left'>
            Upload Image
          </label>
          <input type='file' id='image' accept='image/*' onChange={handleImageChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>
        {imagePreview && (
          <div className='mb-4'>
            <img src={imagePreview} alt='Preview' className='max-w-full h-auto' />
          </div>
        )}
        <div className='mt-6'>
          <button type='submit' className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md hover:bg-[#FF3D20] transition-colors duration-300' disabled={updateMutation.isLoading}>
            {updateMutation.isLoading ? 'Updating...' : 'Update Meta Data'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMetaDataForm;
