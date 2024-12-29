import drone from '../../assets/drone.jpg';
import ludo from '../../assets/ludo.jpg';
import musicalInstrument from '../../assets/musical.jpg';
import scooter from '../../assets/scotter.jpg';
import shows from '../../assets/sporting_shows.jpg';
import videoGame from '../../assets/videoGames.jpg';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../hooks/axiosInstance';

const CategorySection = () => {
  // const categories = [
  //   { image: scooter, label: 'Scooters', item: 4 },
  //   { image: videoGame, label: 'Video Games & Consoles', item: 4 },

  //   { image: shows, label: 'Sporting Goods', item: 4 },
  //   { image: musicalInstrument, label: 'Musical Instruments', item: 4 },
  //   { image: ludo, label: 'Toys & Games', item: 4 },
  //   { image: drone, label: 'Video Games & Consoles', item: 4 },
  // ];

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axiosInstance.get('/category');
      return response.data.data;
    },
  })

  return (
    <div className='p-6 md:p-10 bg-[#FFFAE9] relative'>
      <h4 className='text-xs sm:text-sm text-gray-500 font-semibold uppercase'>Easy Rental Services</h4>
      <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-2'>
        Explore Our Best And <br /> Favorites <span className='text-yellow-500 underline'> Categories</span>
      </h2>

      <div className='my-12 relative'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          loop={true}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className='mySwiper '
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <div style={{ backgroundImage: `url(${category.icon})` }} className=' h-[295px] flex justify-center items-center w-full bg-cover bg-center cursor-pointer group '>
                <div className='absolute inset-0 bg-gradient-to-t from-black opacity-70'></div>
                <div className='absolute bottom-8  text-xl font-bold text-center flex flex-col gap-2 transition duration-300 text-white'>
                  {category.name}

                  <span className='hidden group-hover:block  text-sm text-yellow-400 transition duration-300'>{category.subcategories.length} ITEMS</span>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className='custom-prev text-white text-3xl absolute -left-5 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer'>
            <GoArrowLeft />
          </div>
          <div className='custom-next text-white text-3xl absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>
            <GoArrowRight />
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default CategorySection;
