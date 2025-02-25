import { useContext } from "react";
import { AuthContext } from "../../../authentication/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";


const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data
        }
    })

    return (
        <div>
            <Helmet><title>HealthAid | Payment History</title></Helmet>
            <h2 className="text-3xl font-bold text-center my-6">Payment History</h2>
            <div className="p-6 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">No:</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Fees</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Confirmation Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.joinData.camp_name}</td>
                                <td className="border border-gray-300 px-4 py-2">${item.fees}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.joinData.payment_status}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.joinData.confirmation_status}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.transection}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;