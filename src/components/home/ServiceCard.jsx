const ServiceCard = ({ title, description, icon, position }) => (
  <div className='flex w-full items-center text-center   p-4 rounded-md '>
    <div className={`text-4xl text-pink-400 mb-2 shadow-lg flex justify-center items-center p-4 bg-white absolute  ${position}`}>{icon}</div>
    <div className='flex flex-col'>
      <h3 className='font-semibold text-lg text-gray-800'>{title}</h3>
      <p className='text-gray-600 text-sm'>{description}</p>
    </div>
  </div>
);

export default ServiceCard;
