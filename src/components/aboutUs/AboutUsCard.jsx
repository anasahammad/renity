

const AboutUsCard = ({ icon, title, content }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105'>
      <div className='bg-gradient-to-r from-blue-500 to-[#F8748C] p-4 flex items-center justify-center'>{icon}</div>
      <div className='p-6'>
        <h3 className='text-xl font-semibold mb-3 text-gray-800'>{title}</h3>
        <p className='text-gray-600'>{content}</p>
      </div>
    </div>
  );
};

export default AboutUsCard;