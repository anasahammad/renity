import john from '../../assets/john.png';
import mekniz from '../../assets/meckniz.png';
import StarRating from '../Shared/StarRating';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../hooks/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';

const TestimonialSection = () => {
  // const testimonials = [
  //   {
  //     name: 'John McKenzie',
  //     role: 'Customer',
  //     image: mekniz,
  //     rating: 5,
  //     comment: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, voluptas molestias adipisci explicabo exercitationem aliquid accusantium ipsa omnis expedita commodi, quas qui. Qui vitae, ratione iusto sint quaerat blanditiis doloremque!',
  //   },

  //   {
  //     name: 'John McKenzie',
  //     role: 'Customer',
  //     image: john,
  //     rating: 4,
  //     comment: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, voluptas molestias adipisci explicabo exercitationem aliquid accusantium ipsa omnis expedita commodi, quas qui. Qui vitae, ratione iusto sint quaerat blanditiis doloremque!',
  //   },

  //   {
  //     name: 'John Doe',
  //     role: 'Seller',
  //     image: john,
  //     rating: 5,
  //     comment: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, voluptas molestias adipisci explicabo exercitationem aliquid accusantium ipsa omnis expedita commodi, quas qui. Qui vitae, ratione iusto sint quaerat blanditiis doloremque!',
  //   },

  //   {
  //     name: 'John McKenzie',
  //     role: 'Customer',
  //     image: mekniz,
  //     rating: 5,
  //     comment: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, voluptas molestias adipisci explicabo exercitationem aliquid accusantium ipsa omnis expedita commodi, quas qui. Qui vitae, ratione iusto sint quaerat blanditiis doloremque!',
  //   },
  // ];

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await axiosInstance.get('/review');
      return response.data.data;
    },
  })

  if (isLoading) return <LoadingSpinner/>;
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
            <div className='bg-white shadow-lg h-[400px] py-8 px-6'>
              <div className='flex items-center gap-6 border-b pb-7'>
                <div>
                  <img alt='' className='w-20 h-20 border rounded-full dark:bg-gray-500 dark:border-gray-300' src={mekniz} />
                </div>

                <div className=''>
                  <h2 className='text-xl font-semibold'>{testimonial?.name}</h2>
                  <h3>Customer</h3>

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
