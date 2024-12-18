import { useQuery } from "@tanstack/react-query";
import UsersTable from "../../components/admindashboard/UsersTable";
import axiosInstance from "../../hooks/axiosInstance";


const Users = () => {

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosInstance.get('/admin/users')
            return response.data.data
        }
    })

    if(isLoading) return 
    return (
        <div>
            <UsersTable refetch={refetch} users={users} />
        </div>
    );
};

export default Users;