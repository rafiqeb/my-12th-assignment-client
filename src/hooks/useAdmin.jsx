import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { AuthContext } from "../authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useContext(AuthContext);
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;