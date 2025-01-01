import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import drone from '../../assets/drone.jpg';
import drum from '../../assets/drum.jpg';
import gim from '../../assets/gim.jpg';
import motorCycle from '../../assets/motor_cycle.jpg';
import peoples from '../../assets/peoples.jpg';
import speedBoat from '../../assets/speedboat.jpg';

import { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../hooks/axiosInstance';

// export const features = [
//   {
//     name: 'Dron Mavic Mini',
//     rent: 230,
//     image: drone,
//     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
//   },
//   {
//     name: 'Drum Plan For Rent',
//     rent: 230,
//     image: drum,
//     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
//   },
//   {
//     name: 'Company Games',
//     rent: 230,
//     image: peoples,
//     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
//   },
//   {
//     name: 'Athletic Trainer',
//     rent: 230,
//     image: gim,
//     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
//   },
//   {
//     name: 'Water Bike For Fun 2',
//     rent: 230,
//     image: speedBoat,
//     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
//   },
//   {
//     name: 'MotorCycle BMW Adventure',
//     rent: 230,
//     image: motorCycle,
//     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
//   },
// ];
const FeaturedSection = () => {
  const swiperRef = useRef(null);

    const {
      data: features = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['features'],
      queryFn: async () => {
        const response = await axiosInstance.get('/rental');
        return response.data.data;
      },
    });
  // const features = [
  //   {
  //     name: 'Dron Mavic Mini',
  //     rent: 230,
  //     image: drone,
  //     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
  //   },
  //   {
  //     name: 'Drum Plan For Rent',
  //     rent: 230,
  //     image: drum,
  //     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
  //   },
  //   {
  //     name: 'Company Games',
  //     rent: 230,
  //     image: peoples,
  //     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
  //   },
  //   {
  //     name: 'Athletic Trainer',
  //     rent: 230,
  //     image: gim,
  //     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
  //   },
  //   {
  //     name: 'Water Bike For Fun 2',
  //     rent: 230,
  //     image: speedBoat,
  //     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
  //   },
  //   {
  //     name: 'MotorCycle BMW Adventure',
  //     rent: 230,
  //     image: motorCycle,
  //     features: ['Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ', 'Freq Range 5-300HZ'],
  //   },
  // ];

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      const paginationElements = document.querySelectorAll('.pagination-segment');

      paginationElements.forEach((element, index) => {
        element.addEventListener('click', () => {
          swiper.slideTo(index); // Navigate to the clicked slide
        });
      });
    }
  }, [swiperRef]);

 
  return (
    <div>
      <div className='text-center'>
        <h4 className='text-xs sm:text-sm text-gray-500 font-semibold uppercase'>About Renity - Easy Rental Services</h4>
        <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mt-2'>
          View Featured
          <span className='text-[#F8748C] underline '> Equipments</span>
        </h2>
      </div>

      <div className='my-12 relative'>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={10}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          pagination={{
            el: '.swiper-pagination',
            type: 'custom',
            renderCustom: (swiper, current, total) => {
              let paginationHTML = '<div class="pagination-line ">';
              for (let i = 1; i <= total; i++) {
                paginationHTML += `<span class="pagination-segment ${i === current ? 'active' : ''}"></span>`;
              }
              paginationHTML += '</div>';
              return paginationHTML;
            },
          }}
          loop={true}
          modules={[Navigation, Pagination]}
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
          {features?.map((feature) => (
            <SwiperSlide key={feature._id}>
              <div className='relative border-b  h-[420px] group mb-4'>
                <div style={{ backgroundImage: `url(${feature.images[0]})` }} className='  flex justify-center items-center  bg-cover w-full h-[295px] bg-center cursor-pointer  '></div>

                <div className='block group-hover:hidden px-1 py-4'>
                  <h2 className='text-2xl font-semibold'>{feature.name}</h2>
                  <p className='text-gray-600 text-sm'>
                    Rent Per Day <span className='text-[#F8748C] text-xl'>Tk {feature.price}</span>
                  </p>
                </div>

                <div className='hidden  group-hover:block absolute left-5 top-1/4 p-6 bg-white text-slate-700'>
                  <h2 className='text-2xl font-semibold text-gray-900 hover:text-blue-500'>{feature.name}</h2>

                  <p className='text-gray-600 text-sm my-4 border-b pb-4'>
                    Rent Per Day <span className='text-[#F8748C] text-xl'>Tk {feature.price}</span>
                  </p>

                  {/* <ul className='list-disc pl-4 text-sm font-semibold'>
                    {feature.features.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul> */}
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className='custom-prev  text-white text-3xl absolute left-8 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer'>
            <GoArrowLeft />
          </div>
          <div className='custom-next text-white text-3xl absolute right-5 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer'>
            <GoArrowRight />
          </div>

          {/* Custom Pagination Container */}
          <div className='swiper-pagination '></div>
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedSection;
