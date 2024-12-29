import { useQuery } from '@tanstack/react-query';
import RentalsTable from '../../components/admindashboard/RentalsTable';
import axiosInstance from '../../hooks/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';

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

  if (isLoading) return <LoadingSpinner/>;
  return (
    <div>
      <RentalsTable rentals={data} />
    </div>
  );
};

export default Rentals;
