import ServiceCard from "./ServiceCard";
import perSonImage from "../../assets/hero_with_laptop.png";
import { FaEyeSlash, FaLightbulb, FaShieldAlt, FaTools } from "react-icons/fa";

const ServiceSection = () => {
    const services = [
        { title: "Fully Insured Rentals", description: "Cursus ullamcorper ultricies amet imperdiet amet risus volutpat.", icon: <FaShieldAlt /> },
        
        { title: "Brands Equipments", description: "Cursus ullamcorper ultricies amet imperdiet amet risus volutpat.", icon: <FaTools /> },
        { title: "No Hidden Charges", description: "Cursus ullamcorper ultricies amet imperdiet amet risus volutpat.", icon: <FaEyeSlash /> },
        { title: "Smarter Way To Rent", description: "Cursus ullamcorper ultricies amet imperdiet amet risus volutpat.", icon: <FaLightbulb /> }
    ];

    return (
        <div className="px-28 py-12">
            <div className="text-center mb-12">
                <h4 className="text-xs sm:text-sm text-gray-500 font-semibold uppercase">
                    Affordable, Best & Easy Rental Services
                </h4>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mt-2">
                    Reasons to
                    <span className="text-yellow-400 underline"> Choose Renity</span>
                </h2>
            </div>

            <div className=" ">
               
                <div className="grid grid-cols-1 md:grid-cols-3 items-center mx-auto">
                  
                    

                   <div>
                   <div className="flex relative flex-col md:gap-20 justify-between px-6 ">
                         
                            <ServiceCard position={"-right-8"} title={services[0].title} description={services[0].description} icon={services[0].icon} />
                            <ServiceCard position={"-right-8"} title={services[1].title} description={services[1].description} icon={services[1].icon} />
                        </div>
                   </div>

                   <div className="hidden md:block w-72 h-72 rounded-full overflow-hidden bg-orange-300  shadow-lg">
                        <img src={perSonImage} alt="Person with laptop" className="w-full h-full object-cover" />
                    </div>

                    <div>
                    <div className="flex relative flex-col md:gap-20 justify-between px-6  mt-auto">
                           
                           <ServiceCard position={"-left-16 "} title={services[2].title} description={services[2].description} icon={services[2].icon} />
                           <ServiceCard position={"-left-16 "} title={services[3].title} description={services[3].description} icon={services[3].icon} />
                       </div>
                    </div>

                   
                </div>
            </div>
        </div>
    );
};

export default ServiceSection;
