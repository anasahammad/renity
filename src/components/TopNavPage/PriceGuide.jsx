import React from 'react';
import { FaHome, FaCar, FaBicycle, FaSuitcase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollToTop from '../../hooks/ScrollToTop';

const PriceGuide = () => {
  const rentalItems = [
    {
      id: 1,
      category: 'বাড়ি/অ্যাপার্টমেন্ট',
      minPrice: 1000,
      maxPrice: 5000,
      icon: <FaHome />,
      duration: 'প্রতিদিন',
    },
    {
      id: 2,
      category: 'গাড়ি',
      minPrice: 2000,
      maxPrice: 15000,
      icon: <FaCar />,
      duration: 'প্রতিদিন',
    },
    {
      id: 3,
      category: 'সাইকেল',
      minPrice: 300,
      maxPrice: 1200,
      icon: <FaBicycle />,
      duration: 'প্রতিদিন',
    },
    {
      id: 4,
      category: 'ব্যাগ',
      minPrice: 100,
      maxPrice: 800,
      icon: <FaSuitcase />,
      duration: 'প্রতিদিন',
    },
  ];

  return (
    <ScrollToTop>
      <div className='py-12 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-8'>ভাড়া মূল্যের নির্দেশিকা</h2>

          <motion.div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {rentalItems.map((item) => (
              <motion.div key={item.id} className='bg-white p-6 rounded-lg shadow-xl hover:scale-105 transition-transform' whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className='flex justify-center mb-4'>
                  <div className='text-4xl text-indigo-600'>{item.icon}</div>
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>{item.category}</h3>
                <p className='text-gray-600 mb-2'>
                  দাম:{' '}
                  <span className='font-bold text-green-600'>
                    {item.minPrice} - {item.maxPrice}
                  </span>{' '}
                  {item.duration}
                </p>
                <p className='text-gray-600'>নির্বাচিত ভাড়া দৈনিক ভিত্তিতে হতে পারে।</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.button className='mt-8 px-6 py-2 bg-indigo-600 text-white font-semibold text-lg rounded-full hover:bg-indigo-700 transition-colors' whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            এক্সপ্লোর করুন
          </motion.button>
        </div>
      </div>
    </ScrollToTop>
  );
};

export default PriceGuide;
