import { FaClock, FaHandshake, FaMapMarkerAlt, FaPiggyBank } from "react-icons/fa";
import AboutUsCard from "./AboutUsCard";

const WhyChoseUs = () => {
  const cardData = [
    {
      icon: <FaHandshake className='text-white text-4xl' />,
      title: 'An Easy and Smart Way to Rent',
      content: 'Rental Seba provides a professional and hassle-free rental service, making it easier and smarter to rent items you need.',
    },
    {
      icon: <FaPiggyBank className='text-white text-4xl' />,
      title: 'Renting is Cheaper Than Buying New',
      content: "Six out of ten Rental Seba users find renting cheaper than buying, especially for items used infrequently. It's cost-effective and reduces clutter at home.",
    },
    {
      icon: <FaMapMarkerAlt className='text-white text-4xl' />,
      title: 'Rental Services in Your Area',
      content: 'Proximity is key for Rental Seba users. Most rentals occur within a few kilometers, making it convenient to access needed items quickly and easily.',
    },
    {
      icon: <FaClock className='text-white text-4xl' />,
      title: 'Rent According to Your Suitable Schedule',
      content: 'Flexibility in pick-up and return times is a major advantage. Users can arrange rentals at their convenience, including before work, during lunch breaks, after work, or on weekends.',
    },
  ];

  return (
    <div className=' min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-5xl font-extrabold text-gray-900 text-center mb-8'>
          Why Choose <span className='text-yellow-500 underline'>Rental Seba</span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cardData.map((card, index) => (
            <AboutUsCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;