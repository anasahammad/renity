import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MyFavourite = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wishlist items from localStorage
    const loadWishlist = () => {
      setLoading(true);
      const items = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlistItems(items);
      setLoading(false);
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = (itemId) => {
    const updatedWishlist = wishlistItems.filter((item) => item._id !== itemId);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert('Item removed from wishlist');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem('wishlist');
    alert('Wishlist cleared');
  };

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4d30]'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>My Favorite List</h1>
            <p className='text-gray-600 mt-2'>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button onClick={clearWishlist} className='px-4 py-2 text-sm text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-lg transition-colors duration-300'>
              Clear Wishlist
            </button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-xl shadow-sm'>
            <div className='w-16 h-16 mx-auto mb-4'>
              <svg className='w-full h-full text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
              </svg>
            </div>
            <h3 className='text-xl font-medium text-gray-900 mb-2'>Your wishlist is empty</h3>
            <p className='text-gray-600 mb-6'>Start adding items you'd like to rent later!</p>
            <Link to='/' className='inline-flex items-center px-6 py-3 bg-[#ff4d30] text-white rounded-lg hover:bg-[#ff3516] transition-colors duration-300'>
              Browse Items
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {wishlistItems.map((item) => (
              <div key={item._id} className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
                <div className='relative h-48'>
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.name} className='w-full h-full object-cover' />
                  ) : (
                    <div className='w-full h-full bg-gray-100 flex items-center justify-center'>
                      <span className='text-gray-400 text-sm'>No image available</span>
                    </div>
                  )}
                  <button onClick={() => removeFromWishlist(item._id)} className='absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-colors duration-300'>
                    <svg className='w-5 h-5 text-red-500' fill='currentColor' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
                    </svg>
                  </button>
                </div>

                <div className='p-5'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2 line-clamp-1'>{item.name}</h3>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{item.description}</p>

                  <div className='space-y-3'>
                    <div className='flex justify-between items-center'>
                      <span className='text-2xl font-bold text-[#ff4d30]'>${item.price?.toFixed(2)}</span>
                      <span className='text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full'>{item.location}</span>
                    </div>

                    <div className='flex items-center justify-between text-sm text-gray-500'>
                      <span className='bg-gray-100 px-3 py-1 rounded-full'>{item.category}</span>
                      <span className='bg-gray-100 px-3 py-1 rounded-full'>{item.subCategory}</span>
                    </div>

                    <div className='pt-4'>
                      <Link to={`/details/${item._id}`} className='block w-full text-center bg-[#ff4d30] text-white px-4 py-2.5 rounded-lg hover:bg-[#ff3516] transition-colors duration-300'>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavourite;
