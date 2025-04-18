import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";


const ManageRegister = () => {
    const axiosSecure = useAxiosSecure();
    const { count } = useLoaderData()
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')

    const itemsPerPage = 6;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const {data: camps = [], refetch} = useQuery({
        queryKey: ['joinCamps', currentPage, itemsPerPage, search],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/joinCamps-pagination?page=${currentPage}&size=${itemsPerPage}&search=${search}`);
            return res.data
        }
    })

    const handleCurrentPage = ()=> {
        if(currentPage > 0){
            setCurrentPage(currentPage -1)
        }
    }

    const handleNextPage = ()=> {
        if(currentPage < pages.length -1){
            setCurrentPage(currentPage +1)
        }
    }

    const handleChange = async (id, prevStatus, status) => {
        try {
            const data = await axiosSecure.patch(`/joinCamps-status/${id}`, { status })
            refetch()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Helmet><title>HealthAid | Registered Camps</title></Helmet>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-evenly">
                <h2 className="text-3xl font-bold">Manage Register Camps</h2>
                <div className="join">
                    <input onChange={(e) => setSearch(e.target.value)} className="input input-bordered join-item" placeholder="search" />
                    <button className="btn btn-primary join-item rounded-r-full">Search</button>
                </div>
            </div>
            <div className="p-6 overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">No:</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Participant Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Fees</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Payment Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Confirmation Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Cancel Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{currentPage * itemsPerPage + index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.camp_name}</td>
                                <td className="border border-gray-300 px-4 py-2">${item.camp_fees}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.payment_status}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {item.confirmation_status === 'Confirmed' || item.confirmation_status === 'Rejected' ? (<button disabled>{item.confirmation_status}</button>) : (<button onClick={() => handleChange(item._id, item.confirmation_status, 'Confirmed')} className="btn btn-sm btn-primary hover:underline">{item.confirmation_status}</button>)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.confirmation_status === 'Confirmed' || item.confirmation_status === 'Rejected' ? (<button disabled className="btn btn-sm bg-green-700">Cancel</button>) : (<button onClick={() => handleChange(item._id, item.confirmation_status, 'Rejected')} className="btn btn-sm bg-green-700 hover:underline">Cancel</button>)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={handleCurrentPage}>Prev</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'selected' : ''}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page + 1}</button>)
                }
                <button onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default ManageRegister;