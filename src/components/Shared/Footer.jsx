import { FaEnvelope, FaFacebook, FaGoogle, FaInstagram, FaLinkedin, FaPinterestP, FaTwitter } from 'react-icons/fa';
import { FaMapLocationDot, FaPhoneVolume } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import logo from '/rentalLogo.png';
const Footer = () => {
  const socialMedia = [
    { name: 'facebook', icon: <FaFacebook />, path: '/' },
    { name: 'twitter', icon: <FaTwitter />, path: '/' },
    { name: 'pinterest', icon: <FaPinterestP />, path: '/' },
    { name: 'linkedin', icon: <FaLinkedin />, path: '/' },
    { name: 'google', icon: <FaGoogle />, path: '/' },
    { name: 'instagram', icon: <FaInstagram />, path: '/' },
  ];
  return (
    <footer className='bg-[#FBFAF3] py-20'>
      <div className='px-8 mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 '>
        {/* Logo and Description */}
        <div className='md:col-span-2'>
          <img src={logo} alt='Renity Logo' className='mb-4 h-12' />

          <p className='mt-4 text-gray-500'>
            The lucts portt tore mauris amet port masa <br /> varused mauris maurimet. Magna <br /> sollicit mauris amet port tore mauris <br /> amet ipsum eudin volutpat.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className='text-lg  font-semibold mb-4'>Useful Links</h3>
          <ul className='space-y-2  list-disc pl-4 text-gray-600'>
            <li>About Renity</li>
            <li>How It Works</li>
            <li>Latest News</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Explore Renity */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Explore Renity</h3>
          <ul className='space-y-2 list-disc  pl-4 text-gray-600'>
            <li>Browse Tools</li>
            <li>Latest Equipments</li>
            <li>Recent Rentals</li>
            <li>Read FAQ’s</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
          <ul className='space-y-2 text-gray-600'>
            <li className='flex items-start gap-2'>
              <FaMapLocationDot size={40} />
              11935 Fairview St, El Monte, CA 91732
            </li>
            <li className='flex items-center gap-2'>
              <FaPhoneVolume size={24} />
              +1 (300) 490 5008
            </li>
            <li className='flex items-center gap-2'>
              <FaEnvelope size={24} />
              support@domain.com
            </li>
          </ul>
        </div>
      </div>

      <div className='px-8 pt-20 flex flex-col md:flex-row items-center justify-between'>
        <div className='text-gray-600 text-sm'>&copy; {new Date().getFullYear()} Renity Rental. All Rights Reserved. Terms & Conditions</div>

        {/* Social Links */}
        <div className='flex items-center gap-3 md:gap-4'>
          {socialMedia.map((item, index) => (
            <Link to={item.path} className='bg-white p-3 rounded-full' key={index}>
              {item.icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
