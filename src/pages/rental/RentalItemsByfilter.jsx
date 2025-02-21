import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ScrollToTop from '../../hooks/ScrollToTop';

const ProductFilterPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState(['Bagerhat', 'Bandarban', 'Barguna', 'Barisal', 'Bhola', 'Bogra', 'Brahmanbaria', 'Chandpur', 'Chapai Nawabganj', 'Chattogram' /* ... other locations ... */]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromParams = searchParams.get('category') || '';
  const subcategoryFromParams = searchParams.get('subcategory') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromParams);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/category`);
        const data = await response.json();
        setCategories(data?.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory) queryParams.append('category', selectedCategory);
        if (subcategoryFromParams) queryParams.append('subcategory', subcategoryFromParams);
        if (selectedLocation) queryParams.append('location', selectedLocation);
        queryParams.append('minPrice', priceRange[0]);
        queryParams.append('maxPrice', priceRange[1]);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/rental?${queryParams}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, subcategoryFromParams, selectedLocation, priceRange]);

  return (
    <ScrollToTop>
      <div className='min-h-screen  py-8'>
        <div className='max-w-6xl mx-auto px-4'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>Filter Products</h1>
            <p className='text-gray-600'>Find the perfect items for your needs</p>
          </div>

          {/* Filters */}
          <div className='bg-white rounded-lg shadow-lg p-6 mb-8'>
            <div className='flex items-center gap-2 mb-6'>
              <svg className='w-5 h-5 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
              </svg>
              <h2 className='text-xl font-semibold'>Filter Options</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {/* Category Select */}
              <div className='space-y-2'>
                <label className='text-sm font-medium flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                  </svg>
                  Category
                </label>
                <select
                  className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSearchParams({ category: e.target.value, subcategory: subcategoryFromParams });
                  }}
                >
                  <option value=''>All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Select */}
              <div className='space-y-2'>
                <label className='text-sm font-medium flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  Location
                </label>
                <select className='w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors' value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                  <option value=''>All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className='space-y-4'>
                <label className='text-sm font-medium flex items-center gap-2'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className='px-2 space-y-4'>
                  <input type='range' min='0' max='5000' value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer' />
                  <input type='range' min='0' max='5000' value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer' />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
            </div>
          ) : products.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {products.map((product) => (
                <Link key={product._id} to={`/details/${product._id}`} className='group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>
                  <div className='relative'>
                    <img src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} className='w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300' />
                    {product.discount > 0 && <span className='absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full'>Save ${product.discount}</span>}
                  </div>
                  <div className='p-4'>
                    <h2 className='text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors'>{product.name}</h2>
                    <div className='space-y-2'>
                      <p className='text-sm text-gray-600 flex items-center gap-1'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
                        </svg>
                        {product.subCategory}
                      </p>
                      <p className='text-sm text-gray-600 flex items-center gap-1'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        {product.location}
                      </p>
                      <div className='flex items-baseline gap-2 mt-2'>
                        <span className='text-lg font-bold text-blue-600'>${product.price}</span>
                        {product.discount > 0 && <span className='text-sm text-gray-400 line-through'>${product.price + product.discount}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <svg className='w-12 h-12 mx-auto text-gray-400 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
              </svg>
              <p className='text-xl text-gray-600'>No products found</p>
              <p className='text-gray-500 mt-2'>Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>
    </ScrollToTop>
  );
};

export default ProductFilterPage;
