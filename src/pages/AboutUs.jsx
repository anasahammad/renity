import AboutSection from '../components/home/About';
import ServiceSection from '../components/home/Services';
import TestimonialSection from '../components/home/Testimonial';
import Heading from '../components/Shared/Heading';

const AboutUs = () => {
  return (
    <div className='py-20'>
      <Heading level={'About Us'} />
      <AboutSection />
      <TestimonialSection />
      <ServiceSection />
    </div>
  );
};

export default AboutUs;
