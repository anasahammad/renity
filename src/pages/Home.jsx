import AboutSection from '../components/home/About';
import ArticleSection from '../components/home/Article';
import BrandSection from '../components/home/Brand';
import CategorySection from '../components/home/Category';
import FeaturedSection from '../components/home/Featured';
import Hero from '../components/home/Hero';
import ServiceSection from '../components/home/Services';
import TestimonialSection from '../components/home/Testimonial';

const Home = () => {
  return (
    <div className='z-0 '>
      <Hero />
      <AboutSection />
      <CategorySection />
      <FeaturedSection />
      <ServiceSection />
      <BrandSection />
      <TestimonialSection />
      <ArticleSection />
    </div>
  );
};

export default Home;
