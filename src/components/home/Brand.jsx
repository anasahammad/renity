import { useEffect, useState } from 'react';
import babyFoodLogo from '../../assets/babyfood.jpg';
import parallaxImage from '../../assets/bgParallax.jpg';
import catHeadLogo from '../../assets/cathead.jpg';
import craneBirdLogo from '../../assets/craneBird.jpg';
import elephantLogo from '../../assets/elephant.jpg';
import toucanLogo from '../../assets/toucan.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BrandSection = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const brands = [
  //   { name: 'Babyfood', logo: babyFoodLogo },
  //   { name: 'Toucan', logo: toucanLogo },
  //   { name: 'CatHead', logo: catHeadLogo },
  //   { name: 'CraneBird', logo: craneBirdLogo },
  //   { name: 'Elephant', logo: elephantLogo },
  // ];

   useEffect(() => {
     fetchCompanies();
   }, []);

   // Fetch all companies
   const fetchCompanies = async () => {
     setLoading(true);
     try {
       const response = await axios.get(`${import.meta.env.VITE_API_URL}/company`);
       console.log('response from company', response.data.data.data);
       setCompanies(response.data.data.data);
       setError(null);
     } catch (err) {
       setError('Failed to fetch companies');
       console.error(err);
     } finally {
       setLoading(false);
     }
   };
  return (
    <div style={{ backgroundImage: `url(${parallaxImage})` }} className='my-28 relative bg-cover bg-center bg-fixed scroll-smooth'>
      <div className='absolute inset-0 bg-black opacity-70'></div>

      <div className='relative z-10 flex flex-col items-center justify-center h-[600px] text-center text-white px-4'>
        <h3 className='text-sm md:text-base font-semibold mb-2'>Affordable, Best & Easy Rental Services</h3>
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4'>
          Browse <span className='text-blue-500 underline'>Equipments Brands</span>
        </h2>

        {/* Logo Section */}
        <div className='grid mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl px-4'>
          {companies?.slice(0, 5)?.map((brand, index) => (
            <Link to={brand?.link} target='_blank' key={index} className='bg-white p-4 rounded-lg shadow-md flex items-center justify-center'>
              <img src={brand.image} alt={brand.name} className='w-24 h-20 sm:w-28 sm:h-24 md:w-36 md:h-32 object-contain' />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
