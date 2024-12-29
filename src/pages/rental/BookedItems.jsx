import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../hooks/axiosInstance";
import BookedItemTable from "../../components/rental/BookedItemTable";
import LoadingSpinner from "../../components/LoadingSpinner";


const BookedItems = () => {
  const { data: bookedItems = [], isLoading, refetch } = useQuery({
    queryKey: ['bookedItems'],
    queryFn: async () => {
      const response = await axiosInstance.get('/book')
      return response.data.data
    }
  })

  if(isLoading) return <LoadingSpinner/>
  return (
    <div>
      <BookedItemTable refetch={refetch} bookedItems={bookedItems} />
    </div>
  );
};

export default BookedItems;