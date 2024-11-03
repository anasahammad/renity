import AboutSection from "../Components/Home/AboutSection";
import ArticleSection from "../Components/Home/ArticleSection";
import BrandSection from "../Components/Home/BrandSection";
import CategorySection from "../Components/Home/CategorySection";
import FeaturedSection from "../Components/Home/FeaturedSection";
import Hero from "../Components/Home/Hero";
import ServiceSection from "../Components/Home/ServiceSection";
import TestimonialSection from "../Components/Home/TestimonialSection";


const Home = () => {
    return (
        <div className="z-0 py-20">
           <Hero/>
           <AboutSection/>
           <CategorySection/>
           <FeaturedSection/>
           <ServiceSection/>
           <BrandSection/>
           <TestimonialSection/>

           <ArticleSection/>
        </div>
    );
};

export default Home;