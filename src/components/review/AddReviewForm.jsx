import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';

const AddReviewForm = ({ setOpen }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const createMutation = useMutation({
    mutationFn: (formData) => axiosInstance.post(`/review`, formData),
    onSuccess: () => {
      toast.success('Review added successfully!');
      setOpen(false);
      setRating('');
      setComment('');
    },
    onError: (error) => {
      console.error('Failed to add review:', error.message);
      toast.error('Failed to add review');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = {
        rating: +rating,
        comment,
      };
      createMutation.mutate(formData);
    } catch (error) {
      console.error('Failed to add review:', error.message);
      toast.error('Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Add Your Review</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='rating'
            className='block text-sm font-medium text-gray-700 mb-1 text-left'
          >
            Rating
          </label>
          <input
            type='number'
            id='rating'
            placeholder='Enter rating'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='comment'
            className='block text-sm font-medium text-gray-700 mb-1 text-left'
          >
            Comment
          </label>
          <textarea
            type='text'
            id='comment'
            placeholder='Enter comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          ></textarea>
        </div>

        <div className='mt-6'>
          <button
            type='submit'
            className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md hover:bg-[#FF3D20] transition-colors duration-300'
            disabled={createMutation.isLoading}
          >
            {loading ? 'Adding...' : 'Add Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
