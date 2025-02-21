import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const RentalItemCard = ({ items }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleAddToWishList = (item) => {
    const updatedWishlist = [...wishlist];
    const itemIndex = updatedWishlist.findIndex((i) => i._id === item._id);

    if (itemIndex !== -1) {
      // Remove from wishlist
      updatedWishlist.splice(itemIndex, 1);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast.error('Item removed from wishlist');
    } else {
      // Add to wishlist
      updatedWishlist.push(item);
      setWishlist(updatedWishlist);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast.success('Item added to wishlist');
    }
  };

  const isInWishlist = (itemId) => {
    return wishlist.some((item) => item._id === itemId);
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {items?.map((item) => (
        <div key={item._id} className='bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px]'>
          <div className='relative h-48 overflow-hidden group'>
            {item.images && item.images.length > 0 ? (
              <img src={item.images[0]} alt={item.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' />
            ) : (
              <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
                <span className='text-gray-400 text-sm'>No image available</span>
              </div>
            )}
            <button onClick={() => handleAddToWishList(item)} className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md transition-all duration-300 hover:bg-white'>
              <svg className={`w-5 h-5 transition-colors duration-300 ${isInWishlist(item._id) ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-red-500'}`} viewBox='0 0 24 24' strokeWidth='2'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
              </svg>
            </button>
          </div>

          <div className='p-5'>
            <div className='mb-4'>
              <h2 className='text-xl font-semibold mb-2 text-gray-800 line-clamp-1'>{item.name}</h2>
              <p className='text-gray-600 text-sm line-clamp-2'>{item.description}</p>
            </div>

            <div className='space-y-3'>
              <div className='flex justify-between items-center'>
                <span className='text-2xl font-bold text-[#ff4d30]'>${item.price.toFixed(2)}</span>
                <span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>{item.location}</span>
              </div>

              <div className='flex items-center justify-between text-sm text-gray-500'>
                <span className='bg-gray-100 px-3 py-1 rounded-full'>{item.category}</span>
                <span className='bg-gray-100 px-3 py-1 rounded-full'>{item.subCategory}</span>
              </div>

              <div className='flex gap-3 pt-2'>
                <Link to={`/details/${item._id}`} className='flex-1 bg-[#ff4d30] text-white px-4 py-2.5 rounded-lg hover:bg-[#ff3516] transition-colors duration-300 flex items-center justify-center gap-2 font-medium'>
                  <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  View Details
                </Link>
                <button onClick={() => handleAddToWishList(item)} className='flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#ff4d30] text-[#ff4d30] hover:bg-[#ff4d30] hover:text-white transition-all duration-300 font-medium'>
                  <svg className='w-5 h-5' viewBox='0 0 24 24' fill={isInWishlist(item._id) ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
                  </svg>
                  {isInWishlist(item._id) ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalItemCard;
