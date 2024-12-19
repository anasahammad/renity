import { FaClock, FaHandshake, FaMapMarkerAlt, FaPiggyBank } from "react-icons/fa";
import AboutUsCard from "./AboutUsCard";

const WhyChoseUs = () => {
 const cardData = [
   {
     icon: <FaHandshake className='text-white text-4xl' />,
     title: 'ভাড়া নেওয়ার সহজ এবং স্মার্ট উপায়',
     content: 'Rental Seba একটি পেশাদার এবং ঝামেলামুক্ত ভাড়া সেবা প্রদান করে, যা আপনাকে প্রয়োজনীয় আইটেমগুলি ভাড়া নেওয়ার কাজটি সহজ এবং স্মার্ট করে তোলে।',
   },
   {
     icon: <FaPiggyBank className='text-white text-4xl' />,
     title: 'নতুন কেনার চেয়ে ভাড়া নেওয়া সস্তা',
     content: 'ছয় জনের মধ্যে চারজন Rental Seba ব্যবহারকারী মনে করেন যে ভাড়া নেওয়া নতুন কেনার চেয়ে সস্তা, বিশেষত যখন বিরলভাবে ব্যবহৃত আইটেমের কথা আসে। এটি অর্থনৈতিক এবং বাড়ির অতিরিক্ত clutter কমায়।',
   },
   {
     icon: <FaMapMarkerAlt className='text-white text-4xl' />,
     title: 'আপনার এলাকায় ভাড়া পরিসেবা',
     content: 'Rental Seba ব্যবহারকারীদের জন্য নিকটবর্তী অবস্থান অত্যন্ত গুরুত্বপূর্ণ। বেশিরভাগ ভাড়া এক বা একাধিক কিলোমিটারের মধ্যে হয়, যা প্রয়োজনীয় আইটেমগুলি দ্রুত এবং সহজে অ্যাক্সেস করতে সুবিধাজনক।',
   },
   {
     icon: <FaClock className='text-white text-4xl' />,
     title: 'আপনার উপযুক্ত সময়সূচী অনুযায়ী ভাড়া আদান প্রদান করুন',
     content: 'পিক-আপ এবং ফেরত দেওয়ার সময়গুলিতে নমনীয়তা একটি বড় সুবিধা। ব্যবহারকারীরা তাদের সুবিধা অনুযায়ী ভাড়া ব্যবস্থা করতে পারেন, যেমন কাজের আগে, মধ্যাহ্নভোজ বিরতিতে, কাজের পরে, বা সপ্তাহান্তে।',
   },
 ];


  return (
    <div className=' min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-5xl font-extrabold text-gray-900 text-center mb-8'>
          Rental Seba<span className='text-yellow-500 underline'>বেছে নেওয়ার কারণ</span>
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cardData.map((card, index) => (
            <AboutUsCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;