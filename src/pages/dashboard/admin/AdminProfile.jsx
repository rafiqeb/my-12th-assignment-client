import { useContext } from "react";
import { AuthContext } from "../../../authentication/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AdminProfile = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const { data: profile = [], refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data
        }
    })
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-10">Organizer Profile</h2>
            <div className="flex justify-center items-center gap-8">
                <img src={profile?.image} alt="" className="w-60 h-60 rounded-lg" />
                <div>
                    <h3 className="text-xl font-bold mb-4">Name: {profile?.name}</h3>
                    <p>Contact me: {profile?.email}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;