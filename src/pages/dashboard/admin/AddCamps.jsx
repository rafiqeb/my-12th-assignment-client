import { useForm } from "react-hook-form";
import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


const AddCamps = () => {
    const { register, handleSubmit, reset } = useForm();
    const [startDate, setStartDate] = useState(new Date());

    const onSubmit = async () => {

    }

    return (
        <div>
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
                            <input {...register('date', { required: true })}
                                required
                                type="text" placeholder="date and time" className="input input-bordered w-full" />
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