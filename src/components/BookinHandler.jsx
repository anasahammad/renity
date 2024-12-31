import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import { FaCalendar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../hooks/axiosInstance';

const BookingHandler = ({ rentalId, existingBookedDates, onBookingSuccess }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();
  const postBooking = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post('/book', data);
      return response.data.data;
    },
    onSuccess: () => {
      onBookingSuccess();
      setStartDate(null);
      setEndDate(null);
      toast.success('Booking successful!');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data);
    },
  });
  const handleBooking = async () => {
    if (!userState.userInfo) {
      toast.error('Please login to book this item');
      navigate('/login');
      return;
    }
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates');
      return;
    }

    setIsLoading(true);
    const createBookedDates = () => {
      const bookedDates = [];
      let loop = true;
      for (let i = startDate.getTime(); loop; i += 86400000) {
        if (i <= endDate.getTime()) {
          bookedDates.push(i);
        } else {
          loop = false;
        }
      }
      return bookedDates;
    };
    try {
      await postBooking.mutateAsync({ rental: rentalId, bookedDates: createBookedDates() });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred while booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isDateDisabled = (date) => {
    console.log(date);
    return existingBookedDates.some((bookedDate) => new Date(bookedDate).toDateString() === date.toDateString());
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h2 className='text-2xl font-semibold mb-4 flex items-center'>
        <FaCalendar className='mr-2' />
        Book This Item
      </h2>
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            filterDate={(date) => !isDateDisabled(date)}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholderText='Select start date'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            filterDate={(date) => !isDateDisabled(date)}
            className='w-full p-2 border border-gray-300 rounded-md'
            placeholderText='Select end date'
          />
        </div>
        <button
          onClick={handleBooking}
          disabled={isLoading || !startDate || !endDate}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading || !startDate || !endDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F8748C]'}`}
        >
          {isLoading ? 'Booking...' : 'Book Now'}
        </button>
      </div>
    </div>
  );
};

export default BookingHandler;
