
import { FiHeart, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RentalItemCard = ({ items }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {items?.map((item) => (
        <div key={item._id} className='bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105'>
          <div className='relative h-48 overflow-hidden'>
            {item.images && item.images.length > 0 ? (
              <img src={item.images[0]} alt={item.name} className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-500'>No image available</span>
              </div>
            )}
            <div className='absolute top-2 right-2 bg-white rounded-full p-2 shadow-md'>
              <FiHeart className='text-red-500 hover:text-red-600 cursor-pointer' />
            </div>
          </div>
          <div className='p-4'>
            <h2 className='text-xl font-semibold mb-2 truncate'>{item.name}</h2>
            <p className='text-gray-600 mb-2 truncate'>{item.description}</p>
            <div className='flex justify-between items-center mb-2'>
              <span className='text-lg font-bold text-indigo-600'>${item.price.toFixed(2)}</span>
              <span className='text-sm text-gray-500'>{item.location}</span>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <span className='text-sm text-gray-500'>{item.category}</span>
              <span className='text-sm text-gray-500'>{item.subCategory}</span>
            </div>
            <div className='flex justify-between'>
              <Link to={`/details/${item?._id}`} className='bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300 flex items-center'>
                <FiEye className='mr-2' />
                View Details
              </Link>
              <button className='bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50 transition-colors duration-300 flex items-center'>
                <FiHeart className='mr-2' />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalItemCard;
