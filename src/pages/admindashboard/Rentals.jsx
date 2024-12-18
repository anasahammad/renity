import { useQuery } from '@tanstack/react-query';
import RentalsTable from '../../components/admindashboard/RentalsTable';
import axiosInstance from '../../hooks/axiosInstance';

const Rentals = () => {
  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['rentals'],
    queryFn: async () => {
      const response = await axiosInstance.get(`${import.meta.env.VITE_API_URL}/admin/rentals`);
      return response.data.data;
    },
  });

  if (isLoading) return <div>Loading....</div>;
  return (
    <div>
      <RentalsTable rentals={data} />
    </div>
  );
};

export default Rentals;
