import Swal from "sweetalert2";
import useCamps from "../../../hooks/useCamps";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


const ManageCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { count } = useLoaderData();
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const { data: camps = [], refetch } = useQuery({
        queryKey: ['camps', currentPage, itemsPerPage, search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pagination-camps?page=${currentPage}&size=${itemsPerPage}&search=${search}`);
            return res.data
        }
    })

    const handleChange = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val)
        setCurrentPage(0)
    }

    const handleCurrentPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/camps/${item._id}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: `${item.name} has been deleted`,
                                    icon: "success"
                                });
                                refetch()
                            }
                        })
                }
            });
    }

    return (
        <div>
            <Helmet><title>HealthAid | Manage Camps</title></Helmet>
            {/* search functionality */}
            <div className="flex justify-evenly">
                <h2 className="text-3xl font-bold">Manage Camps</h2>
                <div className="join">
                    <input onChange={(e) => setSearch(e.target.value)} className="input input-bordered join-item" placeholder="search" />
                    <button className="btn btn-accent join-item rounded-r-full">Search</button>
                </div>
            </div>
            {/* table formate all data */}
            <div className="p-6">
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">No:</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Camp Name</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date & Time</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Professional name</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Update Button</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Delete Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {camps.map((item, index) => (
                            <tr key={item._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{currentPage * itemsPerPage + index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.location}</td>
                                <td className="border border-gray-300 px-4 py-2">{item.professional_name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <Link to={`/dashboard/update/${item._id}`}>
                                        <button className="hover:underline">Update</button>
                                    </Link>
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => handleDelete(item)} className="text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* pagination functionality */}
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
                <select value={itemsPerPage} onChange={handleChange} name="" id="">
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="10">10</option>
                </select>
            </div>
        </div>
    );
};

export default ManageCamps;