import { Link, useLoaderData } from "react-router-dom";


const CampDetails = () => {
    const data = useLoaderData()
    const { _id, name, image, fees, description, participent, location, date, professional_name } = data;

    return (
        <div>
            <div className="flex justify-center items-center bg-base-200 shadow-xl p-2">
                <div className="space-y-3">
                    <img src={image} alt="" className="rounded-lg" />
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p>{description}</p>
                    <div className="flex justify-between items-center">
                        <p>Location: {location}</p>
                        <p>Date: {date}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Camp Fees: {fees}</p>
                        <p>Participant: {participent}</p>
                    </div>
                    <div className="border border-slate-400 mt-2 mb-3"></div>
                    <h3 className="text-xl font-semibold">Name: {professional_name}</h3>
                    <div className="text-center">
                        <Link to={`/joinCamp/${_id}`}>
                            <button className="btn btn-outline border-0 border-b-2 border-orange-400 bg-slate-200 mt-6">Join Camp</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;