import babyFoodLogo from '../../assets/babyfood.jpg';
import parallaxImage from '../../assets/bgParallax.jpg';
import catHeadLogo from '../../assets/cathead.jpg';
import craneBirdLogo from '../../assets/craneBird.jpg';
import elephantLogo from '../../assets/elephant.jpg';
import toucanLogo from '../../assets/toucan.jpg';
const BrandSection = () => {
  const brands = [
    { name: 'Babyfood', logo: babyFoodLogo },
    { name: 'Toucan', logo: toucanLogo },
    { name: 'CatHead', logo: catHeadLogo },
    { name: 'CraneBird', logo: craneBirdLogo },
    { name: 'Elephant', logo: elephantLogo },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${parallaxImage})` }}
      className='my-28  relative bg-cover bg-center bg-fixed scroll-smooth'
    >
      <div className='absolute inset-0  bg-black opacity-70'></div>

      <div className='relative z-10 flex flex-col items-center justify-center h-[600px] text-center text-white px-4'>
        <h3 className='text-sm font-semibold mb-2'>Affordable, Best & Easy Rental Services</h3>
        <h2 className='text-3xl font-bold mb-4'>
          Browse <span className='text-blue-500 underline'>Equipments Brands</span>
        </h2>

        {/* Logo Section */}
        <div className='grid mt-8 grid-cols-1 md:grid-cols-5 gap-8'>
          {brands.map((brand, index) => (
            <div
              key={index}
              className='bg-white p-4  shadow-md'
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className='w-36 h-32 object-contain'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandSection;
