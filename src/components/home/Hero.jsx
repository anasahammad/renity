import { CiSearch } from 'react-icons/ci';

import { FlipWords } from '../../acternity/TextAnimation';
import { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';
import LanguageContext from '../../context/LanguageContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Hero = () => {
  const { translations, language } = useContext(LanguageContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const lang = language;

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Locations enum list
  const locations = [
    'Bagerhat',
    'Bandarban',
    'Barguna',
    'Barisal',
    'Bhola',
    'Bogra',
    'Brahmanbaria',
    'Chandpur',
    'Chapai Nawabganj',
    'Chattogram',
    'Chuadanga',
    "Cox's Bazar",
    'Cumilla',
    'Dhaka',
    'Dinajpur',
    'Faridpur',
    'Feni',
    'Gaibandha',
    'Gazipur',
    'Gopalganj',
    'Habiganj',
    'Jamalpur',
    'Jashore',
    'Jhalokati',
    'Jhenaidah',
    'Joypurhat',
    'Khagrachari',
    'Khulna',
    'Kishoreganj',
    'Kurigram',
    'Kushtia',
    'Lakshmipur',
    'Lalmonirhat',
    'Madaripur',
    'Magura',
    'Manikganj',
    'Meherpur',
    'Moulvibazar',
    'Munshiganj',
    'Mymensingh',
    'Naogaon',
    'Narail',
    'Narayanganj',
    'Narsingdi',
    'Natore',
    'Netrokona',
    'Nilphamari',
    'Noakhali',
    'Pabna',
    'Panchagarh',
    'Patuakhali',
    'Pirojpur',
    'Rajbari',
    'Rajshahi',
    'Rangamati',
    'Rangpur',
    'Satkhira',
    'Shariatpur',
    'Sherpur',
    'Sirajganj',
    'Sunamganj',
    'Sylhet',
    'Tangail',
    'Thakurgaon',
  ];

  
  const formattedDates = dateRange.join(',');
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://renity-backend.vercel.app/api/v1/category');
        setCategories(response.data.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = async () => {
    // if (!selectedCategory || !selectedLocation) {
    //   alert('Please select both category and location');
    //   return ;
    // }
    setLoading(true);

    try {
      const response = await axios.get(`https://renity-backend.vercel.app/api/v1/rental`, {
        params: {
          location: selectedLocation,
          category: selectedCategory,
          dates: formattedDates,
        },
      });
// console.log(response)
      setResultData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResultData([]);
    } finally {
      setLoading(false);
    }
  };

  console.log(resultData);
  return (
    <div className='relative bg-[#FFF9EC] h-full py-20 flex flex-col items-center justify-center border-t'>
      {/* Hero Text */}
      <h1 className={`${lang === 'en' && 'text-4xl'} ${lang === 'bn' && 'text-3xl'} font-bold text-center mb-6`}>
        {translations.heroText1} <FlipWords words={['Bike', 'Car', 'Room', 'Hotel', 'Clothing']} /> <br /> <span>{translations.heroText2}</span>
      </h1>

      <div className='bg-white shadow-lg flex flex-col md:flex-row items-center px-4 gap-4 w-[85%] py-4 md:h-24 z-10'>
        {/* Category Dropdown */}
        <motion.select initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='border pl-4 w-full text-gray-700 md:flex-1 h-12 md:h-18 focus:outline-none' onChange={(e) => setSelectedCategory(e.target.value)}>
          <option>{translations.heroSearchingCat}</option>
          {categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </motion.select>

        {/* Location Dropdown */}
        <motion.select initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className='border pl-4 w-full text-gray-700 md:flex-1 h-12 md:h-18 focus:outline-none' value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
          <option>{translations.heroSearchingLoc}</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </motion.select>

        {/* Date Picker */}
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates; 
            setStartDate(start);
            setEndDate(end);

            // Convert dates to milliseconds and set in dateRange
            setDateRange([start ? start.getTime() : null, end ? end.getTime() : null]);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          className='border focus:outline-none md:flex-1 h-12 w-full md:h-18 p-2 text-gray-700'
          placeholderText={translations.heroSearchingDate}
        />

        {/* Search Button */}
        <button onClick={handleSearch} className='bg-yellow-500 text-white font-bold text-[18px] px-4 h-12 w-full md:h-18 md:flex-1 flex items-center gap-2 justify-center'>
          <CiSearch size={32} /> {translations.findNow}
        </button>
      </div>

      {/* Category Icons */}
      <div className='flex flex-col md:flex-row md:justify-center gap-6 z-0 bg-white w-[80%] md:w-[40%] p-8 shadow-md'>
        <div className='flex items-center gap-2'>
          <input checked name='radio' type='radio' className='w-4 h-4 accent-yellow-500 rounded-full' />
          <span className='text-sm text-gray-600'>All</span>
        </div>

        <div className='flex items-center gap-2'>
          <input name='radio' type='radio' className='w-4 h-4 accent-yellow-500 rounded-full' />
          <span className='text-sm text-gray-600'>Delivery</span>
        </div>

        <div className='flex items-center gap-2'>
          <input name='radio' type='radio' className='w-4 h-4 accent-yellow-500 rounded-full' />
          <span className='text-sm text-gray-600'>Self Delivery</span>
        </div>
      </div>

      {/* Search Results */}
      {/* Search Results */}
      <div className='mt-4 w-[85%] mx-auto'>
        {loading ? (
          <div className='flex items-center justify-center h-32'>
            <p className='text-lg text-gray-500'>Loading...</p>
          </div>
        ) : resultData?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {resultData?.map((item, index) => (
              <Link to={`/details/${item?._id}`} key={index} className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300'>
                <img src={item.images[0]} alt={item.name} className='w-full h-40 object-cover rounded' />
                <h3 className='text-xl font-bold mt-2'>{item.name}</h3>
                <p className='text-gray-600 mt-1 line-clamp-2'>{item.description}</p>
                <div className='flex justify-between items-center mt-4'>
                  <p className='text-green-600 font-semibold'>${item.price}</p>
                  <span className={`px-2 py-1 text-sm rounded ${item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.status}</span>
                </div>
                <p className='text-gray-500 text-sm mt-2'>Location: {item.location}</p>
              </Link>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Hero;
