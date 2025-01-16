import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";


const JoinCamp = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, reset } = useForm();
    const data = useLoaderData()
    const { _id, name, image, fees, description, participent, location, date, professional_name } = data;

    const onSubmit = () => {

    }

    useEffect(() => {
        document.getElementById('my_modal_5').showModal()
    }, [])

    return (
        <div>
            <div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Camp name: {name}</h3>
                            <div className="flex justify-between">
                                <p>Location: {location}</p>
                                <p>Fees: {fees}</p>
                            </div>
                            <h3 className="font-bold text-lg">Professional Name: {professional_name}</h3>
                            <div className="flex justify-between">
                                <p>Participant name: {user && user.displayName}</p>
                                <p>Email: {user && user.email}</p>
                            </div>
                        </div>

                        {/* join camp button */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="md:flex gap-6">
                                {/* age */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Age*</span>
                                    </div>
                                    <input {...register('age', { required: true })}
                                        required
                                        type="text" placeholder="age" className="input input-bordered w-full" />
                                </label>
                                {/* gender */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Gender*</span>
                                    </div>
                                    <select defaultValue="default" {...register('gender', { required: true })}
                                        className="select select-bordered w-full">
                                        <option disabled value="default">Gender</option>
                                        <option value="male">Male</option>
                                        <option value="fimale">Fimale</option>
                                    </select>
                                </label>
                            </div>
                            <div className="md:flex gap-6">
                                {/* phone number */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Phone number*</span>
                                    </div>
                                    <input {...register('phone', { required: true })}
                                        required
                                        type="number" placeholder="phone number" className="input input-bordered w-full" />
                                </label>
                                {/* emergency contact */}
                                <label className="form-control w-full my-6">
                                    <div className="label">
                                        <span className="label-text">Emergency contact*</span>
                                    </div>
                                    <input {...register('contact', { required: true })} type="number" placeholder="emergency contact" className="input input-bordered w-full" />
                                </label>
                            </div>
                            <button className="btn btn-warning w-full">Add Camps</button>
                        </form>



                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                {/* <button className="btn">Close</button> */}
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default JoinCamp;