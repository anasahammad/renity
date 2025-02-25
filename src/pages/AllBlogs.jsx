import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = `${import.meta.env.VITE_API_URL}/blog`;
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${searchTerm}`);
      setBlogs(response.data.data.rows);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again.');
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const BlogCard = ({ blog }) => (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105'>
      <img src={blog.images[0] || '/placeholder.svg'} alt={blog.title} className='w-full h-48 object-cover' />
      <div className='p-6'>
        <h2 className='text-xl font-semibold mb-2 text-gray-800'>{blog.title}</h2>
        <p className='text-gray-600 mb-4 line-clamp-3'>{blog.description}</p>
        <Link to={`/blog_details/${blog._id}`} className='inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300'>
          Read More
        </Link>
      </div>
    </div>
  );

  return (
    <div className='min-h-screen  py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-12 text-gray-800'>Our Blog</h1>

        <div className='mb-8 relative'>
          <input type='text' placeholder='Search blogs...' value={searchTerm} onChange={handleSearchChange} className='w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 pl-10' />
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <FaSpinner className='animate-spin text-4xl text-blue-500' />
          </div>
        ) : error ? (
          <div className='text-center py-10 text-red-500'>{error}</div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {blogs.length === 0 && <div className='text-center py-10 text-gray-500'>No blogs found.</div>}

            <div className='mt-12 flex justify-center space-x-2'>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'} transition duration-300`}>
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
