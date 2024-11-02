import { BiCheck } from "react-icons/bi";
import heroWomen from "../../assets/hero_women.jpg";
import heromen from "../../assets/image2.jpg";

const AboutSection = () => {
  const features = [
    "Professional service and security facilities",
    "Secure and safe payment through secure gateway",
    "Regular price checks ensure competitive marketing",
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 md:p-16">
      {/* Left Side: Overlapping Images */}
      <div className="relative flex flex-col gap-4 w-full md:w-1/2">
        <div className="relative">
          <img
            src={heroWomen}
            alt="Main Image"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="absolute bottom-4 left-4 md:-bottom-8 md:-left-8 w-40 h-40 md:w-64 md:h-64 overflow-hidden shadow-lg bg-white p-4">
          <img
            src={heromen}
            alt="Secondary Image"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Right Side: Content */}
      <div className="w-full md:w-1/2 pt-10">
        <h4 className="text-xs sm:text-sm text-gray-500 font-semibold uppercase">
          About Rently - Easy Rental Services
        </h4>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-2">
          Get The Best & The Most Used{" "}
          <span className="text-yellow-500">Brands Equipments</span>
        </h2>
        <p className="my-4 sm:my-6 text-gray-600 text-sm sm:text-base">
          Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
          Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper
          libero, sit amet adipiscing sem neque sed ipsum.
        </p>

        {/* Features List */}
        <div className="space-y-4 border-b-2 pb-6 sm:pb-8 md:pb-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-pink-600 border-2 flex items-center justify-center">
                <BiCheck className="w-3 h-3 text-pink-600" />
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">{feature}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8">
          <div className="border-r-0 sm:border-r-2 pr-0 sm:pr-8 text-center sm:text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500">
              15+
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">Years in Business</p>
          </div>
          <div className="border-r-0 sm:border-r-2 pr-0 sm:pr-8 text-center sm:text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-500">
              3K+
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">Jobs Done</p>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500">
              1.2M
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
