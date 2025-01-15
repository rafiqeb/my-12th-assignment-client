import { Link } from "react-router-dom";


const Camp = ({ camp }) => {
    const { _id, name, image, fees, description, participent, location, date, professional_name } = camp;
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes"
                        className="w-[320px] h-[220px] lg:w-full lg:h-[260px] rounded-xl" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <div className="flex justify-between">
                        <p>Location: {location}</p>
                        <p>Date: {date}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Camp Fees: {fees}</p>
                        <p>Participant: {participent}</p>
                    </div>
                    <h3 className="text-xl font-semibold">Name: {professional_name}</h3>
                    <div className="card-actions justify-center">
                        <Link to={`/details/${_id}`}>
                            <button className="btn btn-outline border-0 border-b-2 border-orange-400 bg-slate-200 mt-6">Camp Details</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Camp;