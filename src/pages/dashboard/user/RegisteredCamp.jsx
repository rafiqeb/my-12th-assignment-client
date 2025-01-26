import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";


const RegisteredCamp = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [joinCamps, loading, refetch] = useCart()

    const totalPrice = joinCamps.reduce((total, item) => total + item.camp_fees, 0)

    const handleFeedback = () => {
        document.getElementById('my_modal_2').showModal()
    }

    const onSubmit = async (data) => {
        const feedbackItem = {
            feedback: data.feedback,
            rating: parseFloat(data.rating),
        }
        try {
            const res = await axiosSecure.post('/feedback', feedbackItem);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: 'Thanks for your feedback',
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/')
            }
        }
        catch (err) {
            console.log(err);
            toast.error(err.message)
        }
    }

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
            <Helmet><title>HealthAid | Registered Camps</title></Helmet>
            <div className="flex justify-evenly mb-8">
                <h2 className="text-3xl font-bold">Register Camps: {joinCamps.length}</h2>
                <h2 className="text-3xl font-bold">Total Camp Fees: ${totalPrice}</h2>
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
                            <th className="border border-gray-300 px-4 py-2 text-left">Payment Button</th>
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
                                <td className="border border-gray-300 px-4 py-2">

                                    {item.payment_status === 'Paid' || item.confirmation_status === 'Rejected' ? (<button disabled className="btn btn-sm btn-warning">Pay</button>) : (<Link to={`/dashboard/payment/${item._id}`}>
                                        <button className="btn btn-warning btn-sm hover:underline">Pay</button>
                                    </Link>)}

                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.payment_status === 'Paid' ? (<button disabled className="btn btn-sm bg-green-700">Cancel</button>) : (<button onClick={() => handleDelete(item)} className="btn btn-sm bg-green-700 hover:underline">Cancel</button>)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.confirmation_status === 'Confirmed' ? (<button onClick={handleFeedback} className="btn btn-sm btn-primary hover:underline">Feedback</button>) : (<button disabled className="btn btn-sm btn-primary">Feedback</button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Feedback*</span>
                            </div>
                            <textarea {...register('feedback', { required: true })} className="textarea textarea-bordered h-24" placeholder="your feedback"></textarea>
                        </label>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Rating*</span>
                            </div>
                            <input {...register('rating',)}
                                required
                                type="number" placeholder="rating" step='0.1' className="input input-bordered w-full" />
                        </label>
                        <button className="btn btn-warning w-full">Confirm</button>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default RegisteredCamp;