import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../hooks/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";
import AllReviewsTable from "../../components/admindashboard/AllReviewsTable";


const AllReviews = () => {
   const {
     data: reviews = [],
     isLoading,
     refetch,
   } = useQuery({
     queryKey: ['reviews'],
     queryFn: async () => {
       const response = await axiosInstance.get('/review');
       return response.data.data;
     },
   });

   if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <AllReviewsTable refetch={refetch} reviews={reviews} />
    </div>
  );
};

export default AllReviews;