import React from 'react'
import { FaEyeSlash, FaLightbulb, FaShieldAlt, FaTools, FaUserCheck, FaCalendarAlt } from 'react-icons/fa'
import personImage from '../../assets/hero_with_laptop.png'
import ServiceCard from './ServiceCard';
const services = [
  { title: 'ভাড়া নেওয়ার সহজ এবং স্মার্ট উপায়', icon: <FaShieldAlt />, color: 'bg-blue-100 text-blue-600' },
  { title: 'নতুন কেনার চেয়ে ভাড়া নেওয়া সস্তা', icon: <FaTools />, color: 'bg-green-100 text-green-600' },
  { title: 'আপনার এলাকায় ভাড়া পরিসেবা', icon: <FaEyeSlash />, color: 'bg-purple-100 text-purple-600' },
  { title: 'সবকিছুই সুনিশ্চিত ', icon: <FaLightbulb />, color: 'bg-yellow-100 text-yellow-600' },
  { title: 'প্রত্যেক ইউজার ভেরিফাই করা ', icon: <FaUserCheck />, color: 'bg-red-100 text-red-600' },
  { title: 'উপযুক্ত সময়সূচী অনুযায়ী ভাড়া আদান প্রদান', icon: <FaCalendarAlt />, color: 'bg-indigo-100 text-indigo-600' },
];


const ServiceSection = () => {
  return (
    <section className=' py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h4 className='text-sm sm:text-base text-gray-600 font-semibold uppercase tracking-wide'>সাশ্রয়ী, সেরা এবং সহজ ভাড়া সেবা</h4>
          <h2 className='mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight'>
            Rental Seba
            <span className='text-yellow-500 underline   ml-2'>বেছে নেওয়ার কারণ</span>
          </h2>
        </div>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-64 h-64 bg-yellow-400 rounded-full opacity-50 filter blur-3xl'></div>
          </div>

          <div className='relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center'>
            <div className='space-y-8'>
              {services.slice(0, 2).map((service, index) => (
                <ServiceCard key={index} {...service} position='right' />
              ))}
            </div>

            <div className='hidden md:block'>
              <div className='w-80 h-80 mx-auto rounded-full overflow-hidden bg-orange-300 shadow-2xl ring-4 ring-yellow-400 ring-opacity-50'>
                <img src={personImage} alt='Person with laptop' className='w-full h-full object-cover transform hover:scale-110 transition-transform duration-300' />
              </div>
            </div>

            <div className='space-y-8'>
              {services.slice(2, 4).map((service, index) => (
                <ServiceCard key={index} {...service} position='left' />
              ))}
            </div>
          </div>

          <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto'>
            {services.slice(4).map((service, index) => (
              <ServiceCard key={index} {...service} position='bottom' />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




export default ServiceSection