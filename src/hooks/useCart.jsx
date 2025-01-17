import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";


const useCart = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: joinCamps = [], isPending: loading, refetch} = useQuery({
        queryKey: ['joinCamps'],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/joinCamps/${user?.email}`);
            return res.data
        }
    })

    return [joinCamps, loading, refetch]
};

export default useCart;