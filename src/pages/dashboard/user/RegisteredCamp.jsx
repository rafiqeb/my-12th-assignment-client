import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { Link } from "react-router-dom";


const RegisteredCamp = () => {
    const axiosSecure = useAxiosSecure()
    const [joinCamps, loading, refetch] = useCart()
    const totalPrice = joinCamps.reduce((total, item) => total + item.camp_fees, 0)

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/joinCamps/${item._id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    title: "Cancel!",
                                    text: `${item.camp_name} has been cancel`,
                                    icon: "success"
                                });
                                refetch()
                            }
                        })
                }
            });
    }

    return (
        <div>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-3xl font-bold">Register Items: {joinCamps.length}</h2>
                <h2 className="text-3xl font-bold">Total Camp Fees: ${totalPrice}</h2>
                {joinCamps.length ? <Link to='/dashboard/payment'>
                    <button className="btn btn-warning">Pay</button>
                </Link> : <button disabled className="btn btn-warning">Pay</button>}
            </div>
            <div className="p-6">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">No:</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Fees</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Participant Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Confirmation Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Cancel Button</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Feedback Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinCamps.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.camp_name}</td>
                                <td className="border border-gray-300 px-4 py-2">${item.camp_fees}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.payment_status}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.confirmation_status}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline">Cancel</button>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="hover:underline">Feedback</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamp;