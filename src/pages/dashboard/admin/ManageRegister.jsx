import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageRegister = () => {
    const axiosSecure = useAxiosSecure();
    const [camps, setCamps] = useState([])

    useEffect(() => {
        const allData = async () => {
            const res = await axiosSecure.get('/joinCamps');
            setCamps(res.data);
        }
        allData()
    }, [axiosSecure])

    return (
        <div>
            <div className="p-6">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">No:</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Participant Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Fees</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Confirmation Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Cancel Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.camp_name}</td>
                                <td className="border border-gray-300 px-4 py-2">${item.camp_fees}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.payment_status}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.confirmation_status}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="text-red-500 hover:underline">Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegister;