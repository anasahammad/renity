import React from 'react';
import { FaUserPlus, FaDollarSign, FaFileAlt, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollToTop from '../../hooks/ScrollToTop';

const HowItWorks = () => {
  return (
    <ScrollToTop>
      <div className='py-12 bg-gray-100'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8'>কিভাবে কাজ করে?</h2>

          {/* Tenant (Renting a property) */}
          <motion.div className='mb-16' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h3 className='text-2xl font-semibold text-gray-700 mb-4'>ভাড়া নেওয়ার প্রক্রিয়া</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaUserPlus className='text-3xl text-indigo-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>প্রোফাইল তৈরি করুন</h4>
                <p className='text-gray-600'>আপনার প্রোফাইল তৈরি করুন এবং ভাড়া নেওয়ার জন্য আপনার প্রয়োজনীয় তথ্য দিন।</p>
              </motion.div>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaDollarSign className='text-3xl text-green-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>ভাড়া সম্পত্তি খুঁজুন</h4>
                <p className='text-gray-600'>আপনার প্রয়োজনীয়তা অনুযায়ী ভাড়া দেওয়ার সম্পত্তি খুঁজুন এবং চেক করুন।</p>
              </motion.div>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaFileAlt className='text-3xl text-blue-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>আবেদন করুন</h4>
                <p className='text-gray-600'>আপনার পছন্দের সম্পত্তির জন্য আবেদন করুন এবং মালিকের সাথে যোগাযোগ করুন।</p>
              </motion.div>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaHandshake className='text-3xl text-purple-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>চুক্তি করুন</h4>
                <p className='text-gray-600'>যত তাড়াতাড়ি আপনি টেন্যান্ট হিসেবে চুক্তি স্বাক্ষর করবেন, আপনার নতুন বাড়ি খুঁজে পাবেন।</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Landlord / Lessors (Renting out property) */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h3 className='text-2xl font-semibold text-gray-700 mb-4'>ভাড়া দেওয়ার প্রক্রিয়া</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaUserPlus className='text-3xl text-indigo-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>প্রোফাইল তৈরি করুন</h4>
                <p className='text-gray-600'>আপনার প্রোফাইল তৈরি করুন এবং আপনার ভাড়া দেওয়ার সম্পত্তির বিস্তারিত তথ্য আপলোড করুন।</p>
              </motion.div>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaDollarSign className='text-3xl text-green-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>ভাড়া নির্ধারণ করুন</h4>
                <p className='text-gray-600'>আপনার সম্পত্তির জন্য সঠিক ভাড়া নির্ধারণ করুন এবং বিভিন্ন সুবিধার সাথে তুলনা করুন।</p>
              </motion.div>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaFileAlt className='text-3xl text-blue-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>কনট্র্যাক্ট তৈরি করুন</h4>
                <p className='text-gray-600'>যত তাড়াতাড়ি আপনি একজন টেন্যান্ট পেয়ে যাবেন, একটি কনট্র্যাক্ট তৈরি করুন এবং চুক্তি সম্পন্ন করুন।</p>
              </motion.div>
              <motion.div className='bg-white p-6 rounded-lg shadow-lg' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <FaHandshake className='text-3xl text-purple-600 mb-4' />
                <h4 className='text-xl font-semibold text-gray-800 mb-4'>পেমেন্ট গ্রহণ করুন</h4>
                <p className='text-gray-600'>টেন্যান্ট থেকে পেমেন্ট গ্রহণ করুন এবং আপনার ভাড়া আদায় করুন।</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default HowItWorks;
