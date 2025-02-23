import StarRating from '../Shared/StarRating';

import { Swiper, SwiperSlide } from 'swiper/react';

import { useQuery } from '@tanstack/react-query';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import axiosInstance from '../../hooks/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';

const TestimonialSection = () => {
 
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await axiosInstance.get('/review');
      return response.data.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className='py-16 bg-[#FFFAE9]'>
      <div className='text-center mb-12'>
        <h4 className='text-xs sm:text-sm text-gray-500 font-semibold uppercase'>Affordable, Best & Easy Rental Services</h4>
        <h2 className='text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mt-2'>
          Trusted By More Than <br />
          <span className='text-yellow-400 underline mt-6'> 10k+ Customers</span>
        </h2>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        className='mySwiper '
      >
        {testimonials?.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className='bg-white shadow-lg h-[400px] py-8 px-6 rounded-xl'>
              <div className='flex items-center gap-6 border-b pb-7'>
                <div>
                  <span className='size-20 rounded-full bg-slate-200 grid place-content-center text-2xl font-bold'>
                    {testimonial?.name
                      ?.split(' ')
                      .map((i) => i.slice(0, 1))
                      .join('')
                      .toUpperCase()}
                  </span>
                </div>

                <div className=''>
                  <h2 className='text-xl font-semibold'>{testimonial?.name}</h2>
                  <h3>{testimonial.email}</h3>

                  <div className='mt-3'>
                    <StarRating rating={testimonial?.rating} />
                  </div>
                </div>
              </div>

              <div className='py-6 text-gray-500'>{testimonial?.comment}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSection;
