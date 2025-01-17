import Swal from "sweetalert2";
import useCamps from "../../../hooks/useCamps";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageCamps = () => {
    const axiosSecure = useAxiosSecure()
    const [camps, loading, refetch] = useCamps()

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/camps/${item._id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: `${item.name} has been deleted`,
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
            <div className="p-6">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">No:</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Professional name</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Update Button</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">${item.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.professional_name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <Link to={`/dashboard/update/${item._id}`}>
                                        <button className="hover:underline">Update</button>
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;