import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { FaPencilAlt, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import axiosInstance from '../../hooks/axiosInstance';
import toast from 'react-hot-toast';

const PutSubCategoryForm = ({ refetch, editableSubCategory }) => {
  const [subCategories, setSubCategories] = useState(editableSubCategory?.subcategories || []);
  const [newSubCategory, setNewSubCategory] = useState({ name: '', icon: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    setSubCategories(editableSubCategory?.subcategories || []);
  }, [editableSubCategory]);

  const handleSubCategoryChange = (index, field, value) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index] = {
      ...updatedSubCategories[index],
      [field]: value,
    };
    setSubCategories(updatedSubCategories);
  };

  const handleAddSubCategory = () => {
    if (newSubCategory.name && newSubCategory.icon) {
      setSubCategories([...subCategories, newSubCategory]);
      setNewSubCategory({ name: '', icon: '' });
    }
  };

  const handleDeleteSubCategory = (index) => {
    const updatedSubCategories = subCategories.filter((_, i) => i !== index);
    setSubCategories(updatedSubCategories);
  };

  const handleEditSubCategory = (index) => {
    setEditingIndex(index);
  };

  const handleSaveSubCategory = () => {
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
     },
   });
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCategory = {
      ...editableSubCategory,
      subcategories: subCategories,
    };
    console.log('Updated category:', updatedCategory);
    
    updateMutation.mutate(updatedCategory)
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
              <input
                type='text'
                value={subcategory.icon}
                onChange={(e) => handleSubCategoryChange(index, 'icon', e.target.value)}
                placeholder='Subcategory Icon'
                className='flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'
                disabled={editingIndex !== index}
              />
              {editingIndex === index ? (
                <button type='button' onClick={handleSaveSubCategory} className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'>
                  <FaSave />
                </button>
              ) : (
                <button type='button' onClick={() => handleEditSubCategory(index)} className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2'>
                  <FaPencilAlt />
                </button>
              )}
              <button type='button' onClick={() => handleDeleteSubCategory(index)} className='bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'>
                <FaTrash />
              </button>
            </div>
          ))}
          <div className='flex items-center mt-2'>
            <input type='text' value={newSubCategory.name} onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })} placeholder='New Subcategory Name' className='flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2' />
            <input type='text' value={newSubCategory.icon} onChange={(e) => setNewSubCategory({ ...newSubCategory, icon: e.target.value })} placeholder='New Subcategory Icon' className='flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2' />
            <button type='button' onClick={handleAddSubCategory} className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'>
              <FaPlus />
            </button>
          </div>
        </div>
        <div className='mt-6'>
          <button type='submit' className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md '>
            Update Subcategories
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
                    <img src={subcategory?.icon} alt='' className='rounded-full w-10 h-10' />
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
