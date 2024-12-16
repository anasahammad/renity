import { useState } from 'react';
import { FaThList } from 'react-icons/fa';
import { IoGrid } from 'react-icons/io5';
import gim from '../assets/gim.jpg';
import ludo from '../assets/ludo.jpg';
import Heading from '../components/Shared/Heading';
import ProductCard from '../components/Shared/ProductCard';
const products = [
  {
    id: 1,
    title: 'Athletic Trainer',
    image: gim,
    prices: {
      day: 250,
      week: 380,
      month: 650,
    },
    specs: ['Free Range 0 - 3000sq', 'Output 87 Space Class 2', 'Sensitivity: 0.4 dB', 'Max Input Power: 20 mW'],
    rentalPrice: 250,
    tax: 'Inc. Tax',
  },
  {
    id: 2,
    title: 'Company Games',
    image: ludo,
    prices: {
      day: 250,
      week: 360,
      month: 560,
    },
    specs: ['Free Range 0 - 3000sq', 'Output 87 Space Class 2', 'Sensitivity: 0.4 dB', 'Max Input Power: 20 mW'],
    rentalPrice: 250,
    tax: 'Inc. Tax',
  },
  {
    id: 3,
    title: 'Motocicle BMW Adventure',
    image: ludo,
    prices: {
      day: 170,
      week: 400,
      month: 790,
    },
    specs: ['Free Range 0 - 3000sq', 'Output 87 Space Class 2', 'Sensitivity: 0.4 dB', 'Max Input Power: 20 mW'],
    rentalPrice: 170,
    tax: 'Inc. Tax',
  },
];

const Catalog = () => {
  const [priceRange, setPriceRange] = useState([5.0, 230.0]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  const toggleView = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };
  return (
    <div className='py-20'>
      <Heading level={'Catalog Listing'} />

      <div className='flex min-h-screen bg-[#fcfcfc] my-8'>
        {/* Sidebar */}
        <div className='w-80 p-6 bg-[#FBFAF3] border-r'>
          {/* Price Filter */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4 relative'>
              Price
              <span className='absolute -bottom-1 left-0 h-1 w-12 bg-yellow-400'></span>
            </h3>
            <div className='relative pt-1'>
              <input
                type='range'
                min='5.00'
                max='230.00'
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className='w-full h-2 bg-[#f8748c] rounded-lg appearance-none cursor-pointer'
              />
              <div className='flex justify-between mt-2'>
                <span className='text-xs text-gray-500'>5.00</span>
                <span className='text-xs text-gray-500'>{priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className='mb-8'>
            <h3 className='text-xl  font-semibold mb-4 relative'>
              Category
              <span className='absolute -bottom-1 left-0 h-1 w-20 bg-yellow-400'></span>
            </h3>
            <div className='space-y-4'>
              {['Drones', 'Musical Instruments', 'Scooters', 'Sporting Goods', 'Toys & Games', 'Video Games & Consoles'].map((category) => (
                <label
                  key={category}
                  className='flex items-center space-x-2'
                >
                  <input
                    type='radio'
                    className='form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300'
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, category]);
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category));
                      }
                    }}
                  />
                  <span className='text-sm text-gray-600'>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Kit Type */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4 relative'>
              Kit Type
              <span className='absolute -bottom-1 left-0 h-1 w-20 bg-yellow-400'></span>
            </h3>
            <select className='w-full border border-gray-300 rounded-md py-2 px-3 text-sm'>
              <option>All</option>
              <option>Delivery</option>
              <option>Self Delivery</option>
            </select>
          </div>

          {/* Extra Items */}
          <div className='mb-8'>
            <h3 className='text-xl relative font-semibold mb-4'>
              Extra Items
              <span className='absolute -bottom-1 left-0 h-1 w-24 bg-yellow-400'></span>
            </h3>
            <select className='w-full border border-gray-300 rounded-md py-2 px-3 text-sm'>
              <option>All</option>
            </select>
          </div>

          {/* Location */}
          <div className='mb-8'>
            <h3 className='text-sm font-semibold mb-4'>Location</h3>
            <div className='space-y-2'>
              {['First Street', 'Second Street'].map((location) => (
                <label
                  key={location}
                  className='flex items-center space-x-2'
                >
                  <input
                    type='checkbox'
                    className='form-checkbox h-4 w-4 text-pink-500 rounded border-gray-300'
                  />
                  <span className='text-sm text-gray-600'>{location}</span>
                </label>
              ))}
            </div>
          </div>

          <button className='w-full bg-[#f8748c] text-white py-4  '>APPLY FILTERS</button>
        </div>

        {/* Main Content */}
        <div className='flex-1 p-6'>
          <div className='flex justify-between mb-6'>
            <div>8 results. Showing 5 of 8 of total.</div>
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600'>Sort By</span>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={toggleView}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}
                  aria-label='Grid view'
                >
                  <IoGrid />
                </button>
                <button
                  onClick={toggleView}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'} rounded`}
                  aria-label='List view'
                >
                  <FaThList />
                </button>
              </div>
            </div>
          </div>

          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2  gap-6' : 'space-y-6'}`}>
            {products.map((product, index) => (
              <ProductCard
                key={index}
                viewMode={viewMode}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;