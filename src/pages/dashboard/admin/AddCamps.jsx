import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamps = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        // date and time fixd
        const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        
        if (res.data.success) {
            // send menu item to server
            const campsItem = {
                name: data.name,
                location: data.location,
                date: formattedDate,
                professional_name: data.professional_name,
                fees: parseFloat(data.fees),
                description: data.description,
                image: res.data.data.display_url,
                participent: 0,
            }
            const campsRes = await axiosSecure.post('/camps', campsItem)
            
            if (campsRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the camps`,
                    showConfirmButton: false,
                    timer: 2000
                });
                reset();
                navigate('/dashboard/manageCamps')
            }
        }
    }
    return (
        <div>
            <Helmet><title>HealthAid | Add Camps</title></Helmet>
            <h2 className="text-3xl font-semibold text-center">Add Camps</h2>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Camp name*</span>
                        </div>
                        <input {...register('name', { required: true })}
                            required
                            type="text" placeholder="camp name" className="input input-bordered w-full" />
                    </label>
                    <div className="md:flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Location*</span>
                            </div>
                            <input {...register('location', { required: true })}
                                required
                                type="text" placeholder="location" className="input input-bordered w-full" />
                        </label>
                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Date and Time*</span>
                            </div>
                            <DatePicker 
                                selected={startDate}
                                onChange={(date) => {setStartDate(date); setValue('date', date)}}
                                className="px-4 py-2 rounded-lg w-full border border-blue-300">
                            </DatePicker>
                        </label>
                    </div>
                    <div className="md:flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Professional name*</span>
                            </div>
                            <input {...register('professional_name', { required: true })}
                                required
                                type="text" placeholder="professional name" className="input input-bordered w-full" />
                        </label>
                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Camp fees*</span>
                            </div>
                            <input {...register('fees', { required: true })} type="number" placeholder="camp fees" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="description"></textarea>
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

export default AddCamps;