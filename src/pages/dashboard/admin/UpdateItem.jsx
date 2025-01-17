import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const {name, image, fees, description, participent, location, date, professional_name, _id} = useLoaderData()

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            // send menu item to server
            const campsItem = {
                name: data.name,
                location: data.location,
                date: data.date,
                professional_name: data.professional_name,
                fees: parseFloat(data.fees),
                description: data.description,
                image: res.data.data.display_url,
                participent: 0,
            }
            const campsRes = await axiosSecure.patch(`/camps/${_id}`, campsItem)

            if (campsRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated camps`,
                    showConfirmButton: false,
                    timer: 2000
                });
                reset();
            }
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-semibold text-center">Update Camps</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Camp name*</span>
                        </div>
                        <input {...register('name', { required: true })}
                            required defaultValue={name}
                            type="text" placeholder="camp name" className="input input-bordered w-full" />
                    </label>
                    <div className="md:flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Location*</span>
                            </div>
                            <input {...register('location', { required: true })}
                                required defaultValue={location}
                                type="text" placeholder="location" className="input input-bordered w-full" />
                        </label>
                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Date and Time*</span>
                            </div>
                            <input {...register('date', { required: true })}
                                required defaultValue={date}
                                type="text" placeholder="date and time" className="input input-bordered w-full" />
                            {/* <DatePicker
                                type='text' name="deadline"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300">
                            </DatePicker> */}
                        </label>
                    </div>
                    <div className="md:flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Professional name*</span>
                            </div>
                            <input {...register('professional_name', { required: true })}
                                required defaultValue={professional_name}
                                type="text" placeholder="professional name" className="input input-bordered w-full" />
                        </label>
                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Camp fees*</span>
                            </div>
                            <input {...register('fees', { required: true })} type="number" placeholder="camp fees" defaultValue={fees} className="input input-bordered w-full" />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea {...register('description')} defaultValue={description} className="textarea textarea-bordered h-24" placeholder="description"></textarea>
                    </label>
                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-warning w-full">Add Camps</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;