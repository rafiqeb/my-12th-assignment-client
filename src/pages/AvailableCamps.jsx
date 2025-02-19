import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Camp from "./homePages/Camp";
import { Helmet } from "react-helmet-async";


const AvailableCamps = () => {
    const axiosPublic = useAxiosPublic()
    const [camps, setCamps] = useState([])
    const [loading, setloading] = useState(true)
    const [search, setSearch] = useState('')
    const [layout, setLayout] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPublic.get(`/all-camps?search=${search}`)
            setCamps(res.data);
            setloading(false)
        }
        fetchData()
    }, [axiosPublic, search])

    const handleSort = (sortBy) => {
        if (sortBy === 'register') {
            const sorted = [...camps].sort((a, b) => b.participent - a.participent)
            setCamps(sorted);
        }
        else if (sortBy === 'fees') {
            const sorted = [...camps].sort((a, b) => b.fees - a.fees)
            setCamps(sorted);
        }
        else if (sortBy === 'name') {
            const sorted = [...camps].sort((a, b) => b.name.length - a.name.length)
            setCamps(sorted);
        }
    }

    const handleToggle = () => {
        setLayout((prev) => !prev);
    };

    return (
        <div>
            <Helmet><title>HealthAid | Available Camp</title></Helmet>
            {loading && (<div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>)}
            <div className="bg-base-100 w-full py-6 rounded-lg">
                <h2 className="text-4xl font-bold text-center mt-20">Popular Medical Camps</h2>
            </div>

            {/* sort and search functionality */}
            <div className="flex flex-col md:flex-row items-center gap-8 md: justify-evenly mt-6">
                <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button" className="btn btn-accent m-1">Sort By</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow">
                        <li onClick={() => handleSort('register')}><a>Most Registered</a></li>
                        <li onClick={() => handleSort('fees')}><a>Camp Fees</a></li>
                        <li onClick={() => handleSort('name')}><a>Camp Name</a></li>
                    </ul>
                </div>
                <button onClick={handleToggle} className="btn btn-accent">Change Layout</button>
                <div className="join">
                    <input onChange={(e) => setSearch(e.target.value)} className="input input-bordered join-item" placeholder="search" />
                    <button className="btn btn-accent join-item rounded-r-full">Search</button>
                </div>
            </div>
            {layout ? (
                <div className="grid md:grid-cols-2 lg:ml-32 gap-8 mt-12">
                    {
                        camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                    }
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {
                        camps.map(camp => <Camp key={camp._id} camp={camp}></Camp>)
                    }
                </div>
            )}
        </div>
    );
};

export default AvailableCamps;