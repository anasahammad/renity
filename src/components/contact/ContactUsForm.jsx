import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../hooks/axiosInstance';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/contact', formData);
      toast.success('✅ বার্তা সফলভাবে পাঠানো হয়েছে!', { duration: 4000 });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      toast.error('❌ বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।', { duration: 4000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-[#FFFAE9] py-16'>
      
      <div className='text-center space-y-4'>
        <p className='font-medium'>আপনার কি সাহায্য প্রয়োজন?</p>
        <h1 className='text-5xl font-bold'>
          আমাদেরকে <span className='text-[#F8748C] underline'>বার্তা</span> পাঠান
        </h1>
      </div>
      <div className='max-w-4xl mx-auto p-8 rounded-md'>
        <form
          className='space-y-6'
          onSubmit={handleSubmit}
        >
          {/* Name & Email */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <input
              type='text'
              name='name'
              placeholder='আপনার নাম'
              value={formData.name}
              onChange={handleChange}
              className='w-full border px-4 py-2 focus:ring-yellow-400'
            />
            <input
              type='email'
              name='email'
              placeholder='আপনার ইমেইল'
              value={formData.email}
              onChange={handleChange}
              className='w-full border px-4 py-2 focus:ring-yellow-400'
            />
          </div>

          {/* Phone & Subject */}
          <div className=''>
            <input
              type='text'
              name='phone'
              placeholder='ফোন নাম্বার'
              value={formData.phone}
              onChange={handleChange}
              className='w-full border px-4 py-2 focus:ring-yellow-400'
            />
            {/* <input type='text' name='subject' placeholder='বিষয়' value={formData.subject} onChange={handleChange} className='w-full border px-4 py-2 focus:ring-yellow-400' /> */}
          </div>

          {/* Message */}
          <textarea
            name='message'
            placeholder='আপনার বার্তা লিখুন...'
            rows='8'
            value={formData.message}
            onChange={handleChange}
            className='w-full border px-4 py-2 focus:ring-yellow-400'
          ></textarea>

          {/* Submit Button */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full ${loading ? 'bg-yellow-300' : 'bg-yellow-400'} text-white font-semibold py-3 focus:ring-yellow-600`}
          >
            {loading ? 'অপেক্ষা করুন...' : 'বার্তা পাঠান'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
