import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';
import { FaStar } from 'react-icons/fa';

const AddReviewForm = ({ setOpen }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hover, setHover] = useState(0);

  const createMutation = useMutation({
    mutationFn: (formData) => axiosInstance.post(`/review`, formData),
    onSuccess: () => {
      toast.success('Review added successfully!');
      setOpen(false);
      setRating(0);
      setComment('');
    },
    onError: (error) => {
      console.error('Failed to add review:', error.message);
      toast.error('Failed to add review');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    const formData = { rating, comment };
    createMutation.mutate(formData);
  };

  return (
    <div className='max-w-2xl mx-auto p-3 bg-white rounded-lg shadow-lg'>
      <h2 className='text-3xl font-semibold mb-6 text-gray-800 text-center'>Your Review</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Rating</label>
          <div className='flex justify-center space-x-1'>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input type='radio' name='rating' className='hidden' value={ratingValue} onClick={() => setRating(ratingValue)} />
                  <FaStar className='cursor-pointer transition duration-200' color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} size={32} onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(0)} />
                </label>
              );
            })}
          </div>
        </div>
        <div>
          <label htmlFor='comment' className='block text-sm font-medium text-gray-700 mb-2'>
            Your Comment
          </label>
          <textarea
            id='comment'
            rows='4'
            placeholder='Share your thoughts about the product...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none'
            required
          ></textarea>
        </div>
        <div>
          <button type='submit' className='w-full bg-[#FF4D30] text-white py-2 px-4 rounded-md hover:bg-[#FF4D30] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF4D30]' disabled={createMutation.isLoading}>
            {createMutation.isLoading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
