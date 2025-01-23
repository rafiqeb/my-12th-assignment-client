import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBook, FaCheckDouble, FaDollarSign, FaUsers } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


const Analytics = () => {
    const axiosSecure = useAxiosSecure()

    const { data: states = {} } = useQuery({
        queryKey: ['user-state'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users-state')
            return res.data;
        }
    })

    const { data: camps = [] } = useQuery({
        queryKey: ['joinCamps'],
        queryFn: async () => {
            const res = await axiosSecure.get('/joinCamps')
            return res.data
        }
    })

    // custom shape bar chart
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-6">User Analytics</h2>
            <div className="flex flex-col justify-center items-center gap-10">
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaDollarSign className="text-4xl" />
                        </div>
                        <div className="stat-title">Camp Fees</div>
                        <div className="stat-value">${states.totalPrice}</div>
                        <div className="stat-desc">Jan 1st - Feb 1st</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-4xl" />
                        </div>
                        <div className="stat-title">Users</div>
                        <div className="stat-value">{states.user}</div>
                        <div className="stat-desc">↗︎ 400 (22%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaBook className="text-2xl" />
                        </div>
                        <div className="stat-title">Registered Camps</div>
                        <div className="stat-value">{states?.joinItems}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaCheckDouble className="text-3xl" />
                        </div>
                        <div className="stat-title">Payment Camps</div>
                        <div className="stat-value">{states.payments}</div>
                        <div className="stat-desc">↘︎ 90 (14%)</div>
                    </div>
                </div>
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={camps}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="camp_fees" />
                        <YAxis />
                        <Bar dataKey="camp_fees" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {camps.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default Analytics;