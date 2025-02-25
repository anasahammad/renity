import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLink } from 'react-icons/fa';
import ScrollToTop from '../hooks/ScrollToTop';
const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const API_URL = `${import.meta.env.VITE_API_URL}/blog/details/${id}`;

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}`);
      setBlog(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog details:', error);
      setError('Failed to load blog details. Please try again.');
      setLoading(false);
    }
  };

  const ShareButton = ({ Icon, color, link }) => (
    <a href={link} target='_blank' rel='noopener noreferrer' className={`${color} text-white p-2 rounded-full hover:opacity-80 transition duration-300 ease-in-out transform hover:scale-110`}>
      <Icon size={20} />
    </a>
  );

  if (loading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );

  if (error) return <div className='text-center py-10 text-red-500'>{error}</div>;
  if (!blog) return <div className='text-center py-10'>Blog not found.</div>;

  return (
    <ScrollToTop>
      <div className=' min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden'>
          <div className='relative'>
            {blog.images && blog.images.length > 0 && <img src={blog.images[0] || '/placeholder.svg'} alt={blog.title} className='w-full h-64 sm:h-96 object-cover' />}
            <div className='absolute inset-0 bg-black opacity-60'></div>
            <div className='absolute inset-0 flex items-center justify-center'>
              <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4'>{blog.title}</h1>
            </div>
          </div>

          <div className='p-8'>
            <p className='text-gray-600 text-lg leading-relaxed mb-6'>{blog.description}</p>

            {blog.link && (
              <a href={blog.link} target='_blank' rel='noopener noreferrer' className='inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <FaLink className='mr-2' />
                Read More
              </a>
            )}

            {blog.images && blog.images.length > 1 && (
              <div className='mt-8'>
                <h2 className='text-2xl font-semibold mb-4'>Gallery</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {blog.images.slice(1).map((image, index) => (
                    <img key={index} src={image || '/placeholder.svg'} alt={`Blog image ${index + 2}`} className='w-full h-48 object-cover rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105' />
                  ))}
                </div>
              </div>
            )}

            <div className='mt-8 border-t pt-6'>
              <div className='flex items-center justify-between'>
                <div className='text-sm text-gray-500'>
                  <p>Published on: {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                <div className='flex space-x-2'>
                  <ShareButton Icon={FaFacebookF} color='bg-blue-600' link={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} />
                  <ShareButton Icon={FaTwitter} color='bg-blue-400' link={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(blog.title)}`} />
                  <ShareButton Icon={FaLinkedinIn} color='bg-blue-700' link={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${encodeURIComponent(blog.title)}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default BlogDetails;
