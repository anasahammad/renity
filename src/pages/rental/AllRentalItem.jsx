import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RentalItemsTable from '../../components/rental/RentalItemsTable';
import LoadingSpinner from '../../components/LoadingSpinner';
import axiosInstance from '../../hooks/axiosInstance';

const AllRentalItem = () => {
  const {
    data: rentals = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['rentals'],
    queryFn: async () => {
      const response = await axiosInstance.get(`/rental/lessor`);
      return response.data.data;
    },
  });

  console.log(rentals)

  if(isLoading) return <LoadingSpinner/>
  return (
    <div>
      <RentalItemsTable refetch={refetch} rentals={rentals} />
    </div>
  );
};

export default AllRentalItem;
