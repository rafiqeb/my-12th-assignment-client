import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Camp from "./Camp";

const PopularCamps = () => {
    const axiosPublic = useAxiosPublic()
    const [camps, setCamps] = useState([])

    useEffect(() => {
        const allData = async () => {
            const res = await axiosPublic('/camps')
            const sorted = res.data.sort((a, b) => b.participent - a.participent)
            setCamps(sorted.slice(0, 6));
        }
        allData()
    }, [axiosPublic])

    return (
        <div id="popularCamps" className="mt-16">
            <h2 className="text-4xl font-bold text-center">Popular Medical Camps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {
                    camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                }
            </div>
        </div>
    );
};

export default PopularCamps;