import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import RentalItemsTable from '../../components/rental/RentalItemsTable';

const AllRentalItem = () => {
  const {
    data: rentals = [],
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['rentals'],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/rental`, { withCredentials: true });
      return response.data.data;
    },
  });

  console.log(rentals)

  if(isLoading) return <div>Loading....</div>
  return (
    <div>
      <RentalItemsTable refetch={refetch} rentals={rentals} />
    </div>
  );
};

export default AllRentalItem;
