import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaCheckDouble, FaDollarSign, FaUsers } from "react-icons/fa";


const Analytics = () => {
    const axiosSecure = useAxiosSecure()

    const { data: states } = useQuery({
        queryKey: ['users-state'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users-state')
            console.log(res.data)
            return res.data;
        }
    })
    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-6">User Analytics</h2>
            <div className="stats shadow">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-4xl"/>
                    </div>
                    <div className="stat-title">Camp Fees</div>
                    <div className="stat-value">${states.totalPrice}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-4xl"/>
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{states.user}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-2xl"/>
                    </div>
                    <div className="stat-title">Registered Camps</div>
                    <div className="stat-value">{states.joinItems}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaCheckDouble className="text-3xl"/>
                    </div>
                    <div className="stat-title">Payment Camps</div>
                    <div className="stat-value">{states.payments}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;