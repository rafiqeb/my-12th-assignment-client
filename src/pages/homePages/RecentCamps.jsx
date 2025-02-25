import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Camp from "./Camp";
import { Link } from "react-router-dom";


const RecentCamps = () => {
    const axiosPublic = useAxiosPublic()
    const [camps, setCamps] = useState([])

    useEffect(() => {
        const allData = async () => {
            const res = await axiosPublic('/camps')
            const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
            setCamps(sorted.slice(0, 3));
        }
        allData()
    }, [axiosPublic])

    return (
        <div id="recentCamps" className="mt-24">
            <h2 className="text-4xl font-bold text-center">Recent Medical Camps</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {
                    camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                }
            </div>
            <Link to='/camps'>
                <button className="btn btn-outline border-2 border-orange-400 bg-slate-200 mt-12 mb-4">See All Camps</button>
            </Link>
        </div>
    );
};

export default RecentCamps;