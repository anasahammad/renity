
const ServiceCard = ({ title, icon, color, position }) => {
  const positionClasses = {
    left: '-left-4',
    right: '-right-4',
    bottom: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div className={`relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${position === 'bottom' ? 'text-center' : ''}`}>
      <div className={`absolute ${positionClasses[position]} -top-4 w-12 h-12 ${color} rounded-full flex items-center justify-center text-2xl transform hover:scale-110 transition-transform duration-300`}>{icon}</div>
      <h3 className='text-xl font-semibold text-gray-800 mt-4'>{title}</h3>
      <div className='mt-2 w-12 h-1 bg-yellow-400 rounded-full mx-auto'></div>
    </div>
  );
};

export default ServiceCard;
