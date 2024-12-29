import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../hooks/axiosInstance";
import LoadingSpinner from "../../components/LoadingSpinner";
import AllContactsTable from "../../components/admindashboard/AllContactsTable";


const AllContacts = () => {

   const {
     data: contacts = [],
     isLoading,
     refetch,
   } = useQuery({
     queryKey: ['contacts'],
     queryFn: async () => {
       const response = await axiosInstance.get('/contact');
       return response.data.data;
     },
   });

   if (isLoading) return <LoadingSpinner />;
  return (
    <div>
      <AllContactsTable refetch={refetch} contacts={contacts} />
    </div>
  );
};

export default AllContacts;