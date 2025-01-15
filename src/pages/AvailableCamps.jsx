import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Camp from "./homePages/Camp";


const AvailableCamps = () => {
    const axiosPublic = useAxiosPublic()
    const [camps, setCamps] = useState([])

    useEffect(() => {
        const allData = async () => {
            const res = await axiosPublic('/camps')
            setCamps(res.data);
        }
        allData()
    }, [axiosPublic])
    
    return (
        <div>
            <h2 className="text-4xl font-bold text-center">Popular Medical Camps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {
                    camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                }
            </div>
        </div>
    );
};

export default AvailableCamps;