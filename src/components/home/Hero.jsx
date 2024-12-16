import { CiSearch } from 'react-icons/ci';

const Hero = () => {
  return (
    <div className='relative bg-[#FFF9EC] h-full py-20  flex flex-col items-center justify-center border-t  '>
      <div></div>
      {/* Floating Profile Icons */}
      {/* <div className='absolute top-1/2 left-10 transform -translate-x-1/2 clip-profile'>
        <div className='relative'>
          <img
            src={sarah}
            alt='Sarah'
            className='w-16 h-16 rounded-full shadow-lg'
          />
          <span className='bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg absolute ml-6  top-10 -right-10'>Sarah</span>
        </div>
      </div>
      <div className='absolute top-1/3 right-20 transform translate-x-1/2'>
        <img
          src='/path/to/profile2.jpg'
          alt='Kofi'
          className='w-16 h-16 rounded-full shadow-lg'
        />
        <span className='bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute top-0 right-0'>Kofi</span>
      </div>
      <div className='absolute bottom-1/4 left-20 transform -translate-x-1/2'>
        <img
          src='/path/to/profile3.jpg'
          alt='Root'
          className='w-16 h-16 rounded-full shadow-lg'
        />
        <span className='bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute top-0 right-0'>Root</span>
      </div>
      <div className='absolute bottom-1/4 right-10 transform translate-x-1/2'>
        <img
          src='/path/to/profile4.jpg'
          alt='Burmah'
          className='w-16 h-16 rounded-full shadow-lg'
        />
        <span className='bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full absolute top-0 right-0'>Burmah</span>
      </div> */}

      {/* Hero Text */}
      <h1 className='text-5xl font-bold text-center mb-6'>
        Find Your <span className='text-[#F8748C]'>Scooter</span> <br /> <span>From People Near You</span>
      </h1>

      {/* Search Form */}
      <div className='bg-white shadow-lg flex flex-col md:flex-row items-center px-4 gap-4 w-[80%] py-4 md:h-32 z-10'>
        <select className='border  pl-4 w-full  text-gray-700 md:flex-1 h-12 md:h-24 focus:outline-none'>
          <option>Select Category</option>
          <option>Drones</option>
          <option>Musical Instruments</option>
          <option>Scooter</option>
        </select>
        <input
          type='text'
          placeholder='11/02/2024 - 11/02/2024'
          className='border focus:outline-none md:flex-1 h-12 w-full md:h-24 p-2 text-gray-700'
        />
        <button className='bg-yellow-500 text-white font-bold text-[18px] px-4 h-12 w-full md:h-24 md:flex-1 flex items-center gap-2 justify-center'>
          <CiSearch size={32} /> FIND NOW
        </button>
      </div>

      {/* Category Icons */}
      <div className='flex flex-col md:flex-row md:justify-center gap-6 z-0  bg-white w-[80%] md:w-[40%] p-8 shadow-md'>
        <div className='flex items-center gap-2'>
          <input
            checked
            name='radio'
            type='radio'
            className='w-4 h-4 accent-yellow-500 rounded-full'
          />
          <span className='text-sm text-gray-600'>All</span>
        </div>

        <div className='flex  items-center gap-2'>
          <input
            name='radio'
            type='radio'
            className='w-4 h-4 accent-yellow-500 rounded-full'
          />
          <span className='text-sm text-gray-600'>Delivery</span>
        </div>

        <div className='flex items-center gap-2'>
          <input
            name='radio'
            type='radio'
            className='w-4 h-4 accent-yellow-500 rounded-full'
          />
          <span className='text-sm text-gray-600'>Self Delivery</span>
        </div>
      </div>

      {/* SVG Wave */}
      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 1440 320'
        className='absolute bottom-0 left-0 w-full'
      >
        <path
          fill='#FFFAE9'
          fillOpacity='1'
          d='M0,160L24,154.7C48,149,96,139,144,133.3C192,128,240,128,288,128C336,128,384,128,432,160C480,192,528,256,576,282.7C624,309,672,299,720,272C768,245,816,203,864,165.3C912,128,960,96,1008,80C1056,64,1104,64,1152,80C1200,96,1248,128,1296,122.7C1344,117,1392,75,1416,53.3L1440,32L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z'
        ></path>
      </svg> */}
    </div>
  );
};

export default Hero;
