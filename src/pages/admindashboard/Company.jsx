import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  // Form states
  const [formMode, setFormMode] = useState('create');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    image: '',
    status: 'pending',
  });

  // Status options based on the enum in the model
  const statusOptions = ['pending', 'approved', 'reported', 'rejected', 'deleted'];

  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset'; // Replace with your actual upload preset
  const CLOUDINARY_CLOUD_NAME = 'your_cloud_name'; // Replace with your Cloudinary cloud name
  const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  // Fetch companies on component mount
  useEffect(() => {
    fetchCompanies();
  }, []);

  // Fetch all companies
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/company`);
      console.log("response from company", response.data.data.data);
      setCompanies(response.data.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch companies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    setImageUploading(true);

    try {
      const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData);
      setFormData((prevForm) => ({
        ...prevForm,
        image: response.data.secure_url,
      }));
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    } finally {
      setImageUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formMode === 'create') {
        await axios.post(`${import.meta.env.VITE_API_URL}/company`, formData);
      } else {
        await axios.patch(`${import.meta.env.VITE_API_URL}/company/${selectedCompany._id}`, formData);
      }

      // Reset form and refresh companies
      resetForm();
      fetchCompanies();
      setError(null);
    } catch (err) {
      setError(`Failed to ${formMode} company`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit company
  const handleEdit = (company) => {
    setFormMode('edit');
    setSelectedCompany(company);
    setFormData({
      name: company.name || '',
      link: company.link || '',
      image: company.image || '',
      status: company.status || 'pending',
    });
    window.scrollTo(0, 0);
  };

  // Delete company
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;

    setLoading(true);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/company/${id}`);
      fetchCompanies();
      setError(null);
    } catch (err) {
      setError('Failed to delete company');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormMode('create');
    setSelectedCompany(null);
    setFormData({
      name: '',
      link: '',
      image: '',
      status: 'pending',
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>Company Management</h1>

        {/* Error message */}
        {error && (
          <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6' role='alert'>
            <p>{error}</p>
          </div>
        )}

        {/* Company Form */}
        <div className='bg-white shadow rounded-lg p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4'>{formMode === 'create' ? 'Add New Company' : 'Edit Company'}</h2>

          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Company Name</label>
                <input type='text' name='name' value={formData.name} onChange={handleInputChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Website Link</label>
                <input type='url' name='link' value={formData.link} onChange={handleInputChange} required className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>

              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Company Image</label>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {/* Image Upload Option */}
                  <div>
                    <p className='text-sm text-gray-500 mb-2'>Option 1: Upload Image</p>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleImageUpload}
                      className='block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100'
                    />
                    {imageUploading && <p className='mt-2 text-sm text-blue-600'>Uploading image...</p>}
                  </div>

                  {/* Image URL Option */}
                  <div>
                    <p className='text-sm text-gray-500 mb-2'>Option 2: Paste Image URL</p>
                    <input type='text' name='image' value={formData.image} onChange={handleInputChange} placeholder='https://example.com/image.jpg' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' />
                  </div>
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className='mt-4'>
                    <p className='text-sm text-gray-500 mb-2'>Image Preview:</p>
                    <div className='w-40 h-40 border rounded-md overflow-hidden bg-gray-100'>
                      <img
                        src={formData.image}
                        alt='Preview'
                        className='w-full h-full object-cover'
                        onError={(e) => {
                          e.target.src = '/api/placeholder/160/160';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Status</label>
                <select name='status' value={formData.status} onChange={handleInputChange} className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='mt-6 flex space-x-3'>
              <button type='submit' disabled={loading || imageUploading} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'>
                {loading ? 'Processing...' : formMode === 'create' ? 'Add Company' : 'Update Company'}
              </button>

              {formMode === 'edit' && (
                <button type='button' onClick={resetForm} className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500'>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Companies List */}
        <div className='bg-white shadow rounded-lg overflow-hidden'>
          <h2 className='bg-gray-50 px-6 py-4 text-xl font-semibold border-b'>Companies List</h2>

          {loading && companies.length === 0 ? (
            <div className='p-6 text-center text-gray-500'>Loading companies...</div>
          ) : companies.length === 0 ? (
            <div className='p-6 text-center text-gray-500'>No companies found.</div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Company</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Website</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Created</th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {companies?.map((company) => (
                    <tr key={company._id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          {company.image && (
                            <div className='flex-shrink-0 h-10 w-10 mr-3'>
                              <img
                                className='h-10 w-10 rounded-full object-cover'
                                src={company.image}
                                alt={company.name || 'Company logo'}
                                onError={(e) => {
                                  e.target.src = '/api/placeholder/40/40';
                                }}
                              />
                            </div>
                          )}
                          <div>
                            <div className='text-sm font-medium text-gray-900'>{company.name || 'Unnamed Company'}</div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <a href={company.link} target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:text-blue-800 text-sm'>
                          {company.link}
                        </a>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            company.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : company.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : company.status === 'reported'
                              ? 'bg-orange-100 text-orange-800'
                              : company.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {company.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{new Date(company.createdAt).toLocaleDateString()}</td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        <button onClick={() => handleEdit(company)} className='text-blue-600 hover:text-blue-900 mr-3'>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(company._id)} className='text-red-600 hover:text-red-900'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Company;
