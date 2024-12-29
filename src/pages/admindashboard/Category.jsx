import { useQuery } from "@tanstack/react-query";
import CategoryTable from "../../components/admindashboard/CategoryTable";
import axiosInstance from "../../hooks/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";


const Category = () => {

     const {
       data: categories = [],
       isLoading,
       refetch,
     } = useQuery({
       queryKey: ['categories'],
       queryFn: async () => {
         const response = await axiosInstance.get('/admin/category');
         return response.data.data;
       },
     });

     if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <CategoryTable refetch={refetch} categories={ categories} />
    </div>
  );
};

export default Category;