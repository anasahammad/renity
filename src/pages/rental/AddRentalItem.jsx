import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiUpload, FiX, FiDollarSign, FiMapPin, FiCalendar, FiTag, FiFileText, FiImage } from 'react-icons/fi'

const categories = ['car', 'electronics', 'furniture', 'clothing', 'other']
const rentalPeriods = ['1 day', '3 days', '1 week', '2 weeks', '1 month', '3 months', '6 months', '1 year']



const AddRentalItem = () => {
  const [images, setImages] = useState([])
  const userState = JSON.parse(localStorage.getItem('account'))
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/rental`, {...formData, price:+formData.price, discount: +formData.discount}, {withCredentials: true});

      return response.data;
    },
    onSuccess: (data) => {
      console.log(data)
      toast.success('User logged in successfully');
      
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });


  const onSubmit = async(data) => {
    // const formData = new FormData()
    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value.toString())
    // })
    // images.forEach((image, index) => {
    //   formData.append(`image${index}`, image)
    // })
    // console.log('Form data:', Object.fromEntries(formData))
    
    console.log(data)
    await mutate(data)


  }

  const handleImageUpload = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files)
      setImages(prevImages => [...prevImages, ...newImages])
    }
  }

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className='min-h-screen  py-4 px-2 sm:px-6 lg:px-4'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden'>
        <div className='bg-[#FF4D30]  py-6 px-8'>
          <h1 className='text-3xl font-extrabold text-white'>Create Rental Item</h1>
          <p className='mt-2 text-indigo-100'>Fill in the details to list your item for rent</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='py-8 px-8 space-y-8'>
          <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2'>
            <div className='sm:col-span-2'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                <FiTag className='inline-block mr-2' />
                Item Name
              </label>
              <div className='mt-1'>
                <input id='name' type='text' {...register('name', { required: 'Name is required' })} className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2' />
              </div>
              {errors.name && <p className='mt-1 text-sm text-red-600'>{errors.name.message}</p>}
            </div>

            <div className='sm:col-span-2'>
              <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                <FiFileText className='inline-block mr-2' />
                Description
              </label>
              <div className='mt-1'>
                <textarea
                  id='description'
                  {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' },
                    maxLength: { value: 500, message: 'Description must not exceed 500 characters' },
                  })}
                  rows={4}
                  className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2'
                ></textarea>
              </div>
              {errors.description && <p className='mt-1 text-sm text-red-600'>{errors.description.message}</p>}
            </div>

            <div>
              <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
                Category
              </label>

              <select {...register('category', {required: "Category is required"})} className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none  sm:text-sm rounded-md'>
                <option value=''>Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && <p className='mt-1 text-sm text-red-600'>{errors.category.message}</p>}
            </div>

            <div className='flex gap-2'>
              <div>
                <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
                  <FiDollarSign className='inline-block mr-2' />
                  Price
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <span className='text-gray-500 sm:text-sm'>$</span>
                  </div>
                  <input
                    type='number'
                    {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be positive' } })}
                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-500 rounded-md py-2'
                    placeholder='0.00'
                  />
                </div>
                {errors.price && <p className='mt-1 text-sm text-red-600'>{errors.price.message}</p>}
              </div>

              <div>
                <label htmlFor='discount' className='block text-sm font-medium text-gray-700'>
                  <FiDollarSign className='inline-block mr-2' />
                  Discount
                </label>
                <div className='mt-1 relative rounded-md shadow-sm'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <span className='text-gray-500 sm:text-sm'>$</span>
                  </div>
                  <input
                    type='number'
                    {...register('discount', { required: 'Discount is required', min: { value: 0, message: 'Discount must be positive' } })}
                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border border-gray-500 rounded-md py-2'
                    placeholder='0.00'
                  />
                </div>
                {errors.discount && <p className='mt-1 text-sm text-red-600'>{errors.discount.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor='location' className='block text-sm font-medium text-gray-700'>
                <FiMapPin className='inline-block mr-2' />
                Location
              </label>
              <div className='mt-1'>
                <input type='text' {...register('location', { required: 'Location is required' })} className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border  border-gray-500 rounded-md py-2 px-4' />
              </div>
              {errors.location && <p className='mt-1 text-sm text-red-600'>{errors.location.message}</p>}
            </div>

            <div>
              <label htmlFor='rentalPeriod' className='block text-sm font-medium text-gray-700'>
                <FiCalendar className='inline-block mr-2' />
                Rental Period
              </label>

              <select {...register('rentalPeriod', {required: "Rental Period is required"})} className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
                <option value=''>Select a rental period</option>
                {rentalPeriods.map((period) => (
                  <option key={period} value={period}>
                    {period}
                  </option>
                ))}
              </select>

              {errors.rentalPeriod && <p className='mt-1 text-sm text-red-600'>{errors.rentalPeriod.message}</p>}
            </div>
          </div>
          {/* Upload multiple image */}
          {/* <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <FiImage className='inline-block mr-2' />
              Images
            </label>
           
            <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-100'>
              <div className='space-y-1 text-center'>
                <FiUpload className='mx-auto h-12 w-12 text-gray-400' />
                <div className='flex text-sm text-gray-600'>
                  <label htmlFor='file-upload' className='relative cursor-pointer bg-white rounded-md font-medium text-[#FF4D30] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'>
                    <span>Upload files</span>
                    <input id='file-upload' name='file-upload' type='file' className='sr-only' multiple onChange={handleImageUpload} accept='image/*' />
                  </label>
                  <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB each</p>
              </div>
            </div>

            
          </div> */}

          <div className='sm:col-span-2'>
            <label htmlFor='image' className='block text-sm font-medium text-gray-700'>
              <FiTag className='inline-block mr-2' />
              Item Image link
            </label>
            <div className='mt-1'>
              <input id='name' type='text' {...register('image', { required: 'At least one image is required' })} className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-500 rounded-md px-4 py-2' />
            </div>
            {errors.image && <p className='mt-1 text-sm text-red-600'>{errors.image.message}</p>}
          </div>

          {/* Images preview */}
          {images.length > 0 && (
            <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'>
              {images.map((image, index) => (
                <div key={index} className='relative group'>
                  <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} className='h-24 w-full object-cover rounded-md transition-all duration-300 ease-in-out group-hover:opacity-75' />
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                  >
                    <FiX className='h-4 w-4' />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='pt-5'>
            <div className='flex justify-end'>
              <button type='button' className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Cancel
              </button>
              <button type='submit' className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF4D30]  focus:outline-none focus:ring-2 focus:ring-offset-2 '>
                Create Rental Item
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRentalItem