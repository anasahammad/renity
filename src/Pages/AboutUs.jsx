import AboutSection from "../Components/Home/AboutSection";
import ServiceSection from "../Components/Home/ServiceSection";
import TestimonialSection from "../Components/Home/TestimonialSection";
import Heading from "../Components/Shared/Heading";


const AboutUs = () => {
    return (
        <div className="py-20">
            <Heading level={"About Us"} />
            <AboutSection/>
            <TestimonialSection/>
            <ServiceSection/>
        </div>
    );
};

export default AboutUs;