import { GrStar } from 'react-icons/gr';

const StarRating = ({ rating }) => {
  return (
    <div className='flex space-x-[1px]'>
      {Array.from({ length: 5 }, (_, index) => (
        <GrStar
          key={index}
          color={index < rating ? '#e0e0e0' : ''}
          className='text-xl border bg-[#28a745]'
        />
      ))}
    </div>
  );
};

export default StarRating;
