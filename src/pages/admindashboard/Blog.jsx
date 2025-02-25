import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', description: '', link: '', images: [] });
  const [editingBlog, setEditingBlog] = useState(null);
  const [imageUploadMethod, setImageUploadMethod] = useState('upload'); // 'upload' or 'link'

  const API_URL = `${import.meta.env.VITE_API_URL}/blog`;
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'your-upload-preset';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBlogs(response.data.data.rows);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const createBlog = async (e) => {
    e.preventDefault();
    try {
      let imageUrls = newBlog.images;
      if (imageUploadMethod === 'upload' && e.target.image.files.length > 0) {
        const uploadPromises = Array.from(e.target.image.files).map(handleImageUpload);
        imageUrls = await Promise.all(uploadPromises);
      }

      await axios.post(
        API_URL,
        { ...newBlog, images: imageUrls },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setNewBlog({ title: '', description: '', link: '', images: [] });
      fetchBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      let imageUrls = editingBlog.images;
      if (imageUploadMethod === 'upload' && e.target.image.files.length > 0) {
        const uploadPromises = Array.from(e.target.image.files).map(handleImageUpload);
        imageUrls = await Promise.all(uploadPromises);
      }

      await axios.patch(
        `${API_URL}/${editingBlog._id}`,
        { ...editingBlog, images: imageUrls },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  const toggleBlogStatus = async (id) => {
    try {
      await axios.patch(
        `${API_URL}/status/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling blog status:', error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Blog Management</h1>

      {/* Create Blog Form */}
      <form onSubmit={createBlog} className='mb-8'>
        <input type='text' placeholder='Blog Title' value={newBlog.title} onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })} className='w-full p-2 mb-2 border rounded' />
        <textarea placeholder='Blog Description' value={newBlog.description} onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })} className='w-full p-2 mb-2 border rounded'></textarea>
        <input type='text' placeholder='Blog Link (optional)' value={newBlog.link} onChange={(e) => setNewBlog({ ...newBlog, link: e.target.value })} className='w-full p-2 mb-2 border rounded' />
        <div className='mb-2'>
          <select value={imageUploadMethod} onChange={(e) => setImageUploadMethod(e.target.value)} className='p-2 border rounded'>
            <option value='upload'>Upload Images</option>
            <option value='link'>Image Links</option>
          </select>
        </div>
        {imageUploadMethod === 'upload' ? (
          <input type='file' name='image' accept='image/*' multiple className='w-full p-2 mb-2 border rounded' />
        ) : (
          <input type='text' placeholder='Image URLs (comma-separated)' value={newBlog.images.join(',')} onChange={(e) => setNewBlog({ ...newBlog, images: e.target.value.split(',') })} className='w-full p-2 mb-2 border rounded' />
        )}
        <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
          Create Blog
        </button>
      </form>

      {/* Blog List */}
      <div>
        {blogs?.map((blog) => (
          <div key={blog._id} className='mb-4 p-4 border rounded'>
            <h2 className='text-xl font-semibold'>{blog.title}</h2>
            <p>{blog.description}</p>
            {blog.link && (
              <a href={blog.link} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>
                Read More
              </a>
            )}
            <div className='mt-2 flex flex-wrap'>
              {blog.images.map((image, index) => (
                <img key={index} src={image || '/placeholder.svg'} alt={`${blog.title} - ${index + 1}`} className='mt-2 mr-2 max-w-xs h-auto' />
              ))}
            </div>
            <div className='mt-2'>
              <button onClick={() => setEditingBlog(blog)} className='mr-2 bg-yellow-500 text-white p-1 rounded'>
                Edit
              </button>
              <button onClick={() => toggleBlogStatus(blog._id)} className='mr-2 bg-green-500 text-white p-1 rounded'>
                {blog.status ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => deleteBlog(blog._id)} className='bg-red-500 text-white p-1 rounded'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Blog Modal */}
      {editingBlog && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <h3 className='text-lg font-semibold mb-4'>Edit Blog</h3>
            <form onSubmit={updateBlog}>
              <input type='text' value={editingBlog.title} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} className='w-full p-2 mb-2 border rounded' />
              <textarea value={editingBlog.description} onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })} className='w-full p-2 mb-2 border rounded'></textarea>
              <input type='text' placeholder='Blog Link (optional)' value={editingBlog.link} onChange={(e) => setEditingBlog({ ...editingBlog, link: e.target.value })} className='w-full p-2 mb-2 border rounded' />
              <div className='mb-2'>
                <select value={imageUploadMethod} onChange={(e) => setImageUploadMethod(e.target.value)} className='p-2 border rounded'>
                  <option value='upload'>Upload Images</option>
                  <option value='link'>Image Links</option>
                </select>
              </div>
              {imageUploadMethod === 'upload' ? (
                <input type='file' name='image' accept='image/*' multiple className='w-full p-2 mb-2 border rounded' />
              ) : (
                <input type='text' placeholder='Image URLs (comma-separated)' value={editingBlog.images.join(',')} onChange={(e) => setEditingBlog({ ...editingBlog, images: e.target.value.split(',') })} className='w-full p-2 mb-2 border rounded' />
              )}
              <button type='submit' className='bg-blue-500 text-white p-2 rounded mr-2'>
                Update
              </button>
              <button onClick={() => setEditingBlog(null)} className='bg-gray-500 text-white p-2 rounded'>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
