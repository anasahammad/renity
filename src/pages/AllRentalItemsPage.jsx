import { useQuery } from '@tanstack/react-query';
import RentalItemCard from '../components/RentalItemCard';
import axiosInstance from '../hooks/axiosInstance';

const AllRentalItemsPage = () => {
  const {
    data: rentalItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['rentalItems'],
    queryFn: async () => {
      const response = await axiosInstance.get('/rental');
      return response.data.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <RentalItemCard refetch={refetch} items={rentalItems} />
    </div>
  );
};

export default AllRentalItemsPage;
