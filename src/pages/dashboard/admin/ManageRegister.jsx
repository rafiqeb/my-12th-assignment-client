import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const ManageRegister = () => {
    const axiosSecure = useAxiosSecure();

    const { refetch, data: camps = [] } = useQuery({
        queryKey: ['joinCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/joinCamps')
            return res.data
        }
    })

    const handleChange = async (id, prevStatus, status) => {
        try {
            const data = await axiosSecure.patch(`/joinCamps-status/${id}`, { status })
            console.log(data);
            refetch()
        }
        catch (error) {
            console.log(error)
        }
    }

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
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.confirmation_status === 'Confirmed' ? (<button disabled className="btn btn-sm btn-primary">{item.confirmation_status}</button>) : (<button onClick={() => handleChange(item._id, item.confirmation_status, 'Confirmed')} className="btn btn-sm btn-primary hover:underline">{item.confirmation_status}</button>)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.confirmation_status === 'Confirmed' ? (<button disabled className="btn btn-sm bg-green-700">Cancel</button>) : (<button onClick={() => handleChange(item._id, item.confirmation_status, 'Rejected')} className="btn btn-sm bg-green-700 hover:underline">Cancel</button>)}
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