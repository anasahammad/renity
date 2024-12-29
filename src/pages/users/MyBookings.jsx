import { useMutation, useQuery } from '@tanstack/react-query';
import { MdArrowDropDown, MdDelete, MdEdit, MdMoreVert } from 'react-icons/md';
import axiosInstance from '../../hooks/axiosInstance';
import toast from 'react-hot-toast';

const MyBookings = () => {


  const { data: myBookins = [], isLoading, refetch } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: async () => {
      const response = await axiosInstance.get('/book');
      return response.data.data;
    },
  });
 
  
  const updateMutation = useMutation({
    mutationFn: ({ id, newStatus }) => axiosInstance.put(`book/${id}`, newStatus),
    onSuccess: () => {
      toast.success('Booking status updated successfully!');
      refetch();
    },
    onError: (error) => {
      console.error('Failed to update status:', error.message);
      toast.error(error.message);
    },
  });

  const handleStatusChange = (id, newStatus) => { 
    updateMutation.mutate({ id, newStatus: { status: newStatus } });
  }
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='container mx-auto p-2 md:p-6'>
      <h1 className='text-2xl font-semibold mb-4'>My Bookings ({myBookins?.length})</h1>

      <div className='overflow-x-auto bg-white shadow-md rounded-lg'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Name</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Category</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Booking Date</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Price</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Status</th>
              <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBookins.map((booking) => (
              <tr key={booking._id}>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booking?.rental?.name}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booking?.rental?.category}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booking?.bookedDates.map((date) => new Date(date).toLocaleDateString())}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booking?.rentalPrice}</p>
                </td>
                {/* <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <p className='text-gray-900 whitespace-no-wrap'>{booking.status}</p>
                </td> */}
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='relative inline-block w-full'>
                    <select
                      value={booking?.status}
                       onChange={(e) => handleStatusChange(booking?._id, e.target.value)}

                      className={`appearance-none w-full border-none bg-transparent  py-1 rounded-full font-semibold focus:outline-none ${booking?.status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}
                    >
                      <option value='pending'>Pending</option>
                      <option value='cancelled'>Cancelled</option>
                    </select>
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                      <MdArrowDropDown />
                    </div>
                  </div>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                  <div className='flex items-center space-x-4'>
                    <button
                      //  onClick={() => handleEdit(user._id)}
                      className='text-blue-600 hover:text-blue-900'
                    >
                      <MdEdit className='w-5 h-5' />
                    </button>
                    <button
                      //  onClick={() => handleDelete(user._id)}
                      className='text-red-600 hover:text-red-900'
                    >
                      <MdDelete className='w-5 h-5' />
                    </button>
                    <button className='text-gray-600 hover:text-gray-900'>
                      <MdMoreVert className='w-5 h-5' />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
