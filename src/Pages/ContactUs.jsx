import { FaMapMarkerAlt } from "react-icons/fa";
import Heading from "../Components/Shared/Heading";
import { MdOutlineAlternateEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import ContactUsForm from "../Components/Contact/ContactUsForm";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";



const containerStyle = {
    width: "100%",
    height: "500px",
  };
  
  const center = {
    lat: 51.503399, 
    lng: -0.119519, 
  };
  
const info = [
    {
        icon: <FaMapMarkerAlt/>,
        label: "Our Location",
        para1: "4495 Meadow Drive, Roseville",
        para2: "California – 95678 USA"

    },
    {
        icon: <MdOutlinePhoneInTalk />,
        label: "Phone Number",
        para1: "Support: 1 (800) 236 0011",
        para2: "For Complains: 1(800) 236 0022"

    },
    {
        icon: <MdOutlineAlternateEmail />,
        label: "Email address",
        para1: "Email: rental@renitytools.com",
        para2: "Mon to Sat: 0900am to 0600pm"

    },


]
const ContactUs = () => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: '207582132155-5skskcljrdd97r57dgocqhe2qj9ep5lj.apps.googleusercontent.com',
      })
    
      if (!isLoaded) {
        return <div>Loading Map...</div>;
      }
    return (
        <div className="py-20 ">
           <Heading level={"Contact Us"}/>

           <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">

            {info.map((item, index)=>(
  <div key={index} className="flex flex-col items-center my-12 group">
  {/* Circular Icon with Location */}
  <div className="relative w-24 h-24 flex items-center justify-center">
    {/* Circular border */}
    <div className="absolute w-40 h-40 border-t-4 border-gray-600 rounded-full rotate-[-100deg]" />
    <div className="absolute w-40 h-40 border-b-4 border-gray-600 rounded-full rotate-[-100deg]" />
    {/* Location Icon */}
    <div className="z-10">
      {/* <FaMapMarkerAlt size={50} className="text-[#F8748C]" /> */}
     <div className="text-[#F8748C] text-5xl group-hover:text-yellow-400">{item.icon}</div>
    </div>
    {/* Top and Bottom Squares */}
    <div className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 bg-yellow-400 w-2 h-2" />
    <div className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 bg-yellow-400 w-2 h-2" />
  </div>

  {/* Location Information */}
  <div className="text-center mt-12">
    <h1 className="text-2xl font-semibold my-4">{item.label}</h1>
    <p className="text-gray-600">{item.para1}</p>
    <p className="text-gray-600">{item.para2}</p>
  </div>
</div>
            ))}
         
           </div>

           <ContactUsForm/>

           <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker position={center} />
    </GoogleMap>
        </div>
    );
};

export default ContactUs;