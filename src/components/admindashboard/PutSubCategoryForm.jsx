import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus, FaSave, FaTrash, FaCloudUploadAlt } from 'react-icons/fa';
import axiosInstance from '../../hooks/axiosInstance';
import toast from 'react-hot-toast';

const PutSubCategoryForm = ({ refetch, editableSubCategory }) => {
  const [subCategories, setSubCategories] = useState(editableSubCategory?.subcategories || []);
  const [newSubCategory, setNewSubCategory] = useState({ name: '', icon: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setSubCategories(editableSubCategory?.subcategories || []);
  }, [editableSubCategory]);

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

  const handleSubCategoryChange = (index, field, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = {
      ...updatedSubCategories[index],
      [field]: value,
    };
    setSubCategories(updatedSubCategories);
  };

  const handleAddSubCategory = async () => {
    if (newSubCategory.name && newSubCategory.icon) {
      setIsUploading(true);
      try {
        let iconUrl = newSubCategory.icon;
        if (newSubCategory.icon instanceof File) {
          iconUrl = await uploadToCloudinary(newSubCategory.icon);
        }
        setSubCategories([...subCategories, { ...newSubCategory, icon: iconUrl }]);
        setNewSubCategory({ name: '', icon: '' });
      } catch (error) {
        toast.error('Failed to upload icon. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  const handleEditSubCategory = (index) => {
    setEditingIndex(index);
  };

  const handleSaveSubCategory = async (index) => {
    if (subCategories[index].icon instanceof File) {
      setIsUploading(true);
      try {
        const iconUrl = await uploadToCloudinary(subCategories[index].icon);
        handleSubCategoryChange(index, 'icon', iconUrl);
      } catch (error) {
        toast.error('Failed to upload icon. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
    setEditingIndex(null);
  };

  const updateMutation = useMutation({
    mutationFn: (formData) => axiosInstance.put(`/admin/category/${editableSubCategory?._id}`, formData),
    onSuccess: () => {
      toast.success('Sub Category updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to update sub category:', error.message);
      toast.error('Failed to update sub category. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = {
      ...editableSubCategory,
      subcategories: subCategories,
    };
    console.log('Updated category:', updatedCategory);
    updateMutation.mutate(updatedCategory);
  };

  const handleIconChange = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      if (index === -1) {
        setNewSubCategory({ ...newSubCategory, icon: file });
      } else {
        handleSubCategoryChange(index, 'icon', file);
      }
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-3 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Update Subcategories</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Add/Edit Subcategories</h3>
          {subCategories.map((subcategory, index) => (
            <div key={index} className='flex items-center mb-2'>
              <input
                type='text'
                value={subcategory.name}
                onChange={(e) => handleSubCategoryChange(index, 'name', e.target.value)}
                placeholder='Subcategory Name'
                className='flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
                disabled={editingIndex !== index}
              />
              <div className='relative'>
                <input type='file' id={`icon-${index}`} onChange={(e) => handleIconChange(e, index)} className='hidden' accept='image/*' disabled={editingIndex !== index} />
                <label htmlFor={`icon-${index}`} className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-md cursor-pointer'>
                  {subcategory.icon instanceof File ? (
                    <img src={URL.createObjectURL(subcategory.icon) || '/placeholder.svg'} alt='Icon preview' className='w-full h-full object-cover rounded-md' />
                  ) : subcategory.icon ? (
                    <img src={subcategory.icon || '/placeholder.svg'} alt='Subcategory icon' className='w-full h-full object-cover rounded-md' />
                  ) : (
                    <FaCloudUploadAlt className='text-gray-400' />
                  )}
                </label>
              </div>
              {editingIndex === index ? (
                <button type='button' onClick={() => handleSaveSubCategory(index)} className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ml-2'>
                  <FaSave />
                </button>
              ) : (
                <button type='button' onClick={() => handleEditSubCategory(index)} className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ml-2'>
                  <FaPencilAlt />
                </button>
              )}
              <button type='button' onClick={() => handleDeleteSubCategory(index)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 ml-2'>
                <FaTrash />
              </button>
            </div>
          ))}
          <div className='flex items-center mt-2'>
            <input type='text' value={newSubCategory.name} onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })} placeholder='New Subcategory Name' className='flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2' />
            <div className='relative'>
              <input type='file' id='new-icon' onChange={(e) => handleIconChange(e, -1)} className='hidden' accept='image/*' />
              <label htmlFor='new-icon' className='flex items-center justify-center w-10 h-10 bg-gray-200 rounded-md cursor-pointer'>
                {newSubCategory.icon instanceof File ? <img src={URL.createObjectURL(newSubCategory.icon) || '/placeholder.svg'} alt='New icon preview' className='w-full h-full object-cover rounded-md' /> : <FaCloudUploadAlt className='text-gray-400' />}
              </label>
            </div>
            <button type='button' onClick={handleAddSubCategory} className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 ml-2' disabled={isUploading}>
              {isUploading ? 'Uploading...' : <FaPlus />}
            </button>
          </div>
        </div>
        <div className='mt-6'>
          <button type='submit' className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md' disabled={updateMutation.isLoading || isUploading}>
            {updateMutation.isLoading ? 'Updating...' : 'Update Subcategories'}
          </button>
        </div>
      </form>

      {subCategories.length > 0 && (
        <div className='mt-8'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>All Subcategories</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {subCategories.map((subcategory, index) => (
              <div key={index} className='bg-gray-100 p-4 rounded-md'>
                <div className='flex items-center gap-2 mb-2'>
                  <div>
                    <img src={subcategory.icon instanceof File ? URL.createObjectURL(subcategory.icon) : subcategory.icon} alt='' className='rounded-full w-10 h-10 object-cover' />
                  </div>
                  <span className='text-lg font-medium text-gray-800 mr-2'>{subcategory.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PutSubCategoryForm;
