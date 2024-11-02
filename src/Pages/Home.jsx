import AboutSection from "../Components/Home/AboutSection";
import CategorySection from "../Components/Home/CategorySection";
import FeaturedSection from "../Components/Home/FeaturedSection";
import Hero from "../Components/Home/Hero";
import ServiceSection from "../Components/Home/ServiceSection";


const Home = () => {
    return (
        <div className="z-0 py-20">
           <Hero/>
           <AboutSection/>
           <CategorySection/>
           <FeaturedSection/>
           <ServiceSection/>
        </div>
    );
};

export default Home;