import { useQuery } from '@tanstack/react-query';
import RentalItemCard from '../components/RentalItemCard';
import axiosInstance from '../hooks/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollToTop from '../hooks/ScrollToTop';

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

  if (isLoading) return <LoadingSpinner/>;

  return (
    <ScrollToTop>
      <div>
        <RentalItemCard refetch={refetch} items={rentalItems} />
      </div>
    </ScrollToTop>
  );
};

export default AllRentalItemsPage;
