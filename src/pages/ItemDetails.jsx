import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaShare } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import BookingHandler from '../components/BookinHandler';
import LoadingSpinner from '../components/LoadingSpinner';
import axiosInstance from '../hooks/axiosInstance';

const ItemDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    data: rental,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['rentals', id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/rental/${id}`);
      return response.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (!rental) return <div className='flex justify-center items-center h-screen'>No rental data found</div>;

  const discountedPrice = rental.price - (rental.price * rental.discount) / 100;

  return (
    <div className='max-w-7xl mx-auto p-4 md:p-8'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {/* Image Gallery */}
        <div className='space-y-4'>
          <div className='relative aspect-video overflow-hidden rounded-lg shadow-lg'>
            <img
              src={rental.images[selectedImage]}
              alt={rental.name}
              className='w-full h-full object-cover transition-opacity duration-300'
            />
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {rental.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-blue-500 shadow-md' : 'border-transparent'}`}
              >
                <img
                  src={image}
                  alt={`${rental.name} ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details and Booking */}
        <div className='space-y-6'>
          <div className='flex justify-between items-start'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>{rental.name}</h1>
              <div className='flex items-center gap-2 mt-2 text-gray-600'>
                <FaMapMarkerAlt />
                <span>{rental.location}</span>
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className='p-2 rounded-full hover:bg-gray-100 transition-colors'
              >
                <FaHeart
                  className={isWishlisted ? 'text-red-500' : 'text-gray-400'}
                  size={24}
                />
              </button>
              <button className='p-2 rounded-full hover:bg-gray-100 transition-colors'>
                <FaShare
                  className='text-gray-400'
                  size={24}
                />
              </button>
            </div>
          </div>

          <div className='border-t border-b py-4'>
            <div className='flex items-baseline gap-2'>
              <span className='text-3xl font-bold text-[#EBB714]'>${discountedPrice.toFixed(2)}</span>
              {rental.discount > 0 && (
                <>
                  <span className='text-xl text-gray-400 line-through'>${rental.price.toFixed(2)}</span>
                  <span className='text-sm text-green-500'>({rental.discount}% OFF)</span>
                </>
              )}
            </div>
          </div>

          <div>
            <h2 className='text-xl font-semibold mb-2'>Description</h2>
            <p className='text-gray-600'>{rental.description}</p>
          </div>

          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-gray-50 p-4 rounded-lg shadow'>
                <span className='text-gray-600'>Category</span>
                <p className='font-semibold'>{rental.category}</p>
              </div>
              <div className='bg-gray-50 p-4 rounded-lg shadow'>
                <span className='text-gray-600'>Sub Category</span>
                <p className='font-semibold'>{rental.subCategory}</p>
              </div>
            </div>
          </div>

          {/* Booking Handler */}
          <BookingHandler
            rentalId={rental._id}
            existingBookedDates={rental?.bookedDates}
            onBookingSuccess={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
