import { FaAddressCard, FaBook, FaHome, FaList, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";


const Dashboard = () => {

    const [isAdmin] = useAdmin();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex">
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu p-4">
                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/adminProfile'>
                                    <FaAddressCard />
                                    Organizer Profile</NavLink></li>
                                <li><NavLink to='/dashboard/addCamps'>
                                    <FaUtensils />
                                    Add Camps</NavLink></li>
                                <li><NavLink to='/dashboard/manageCamps'>
                                    <FaList />
                                    Manage Camps</NavLink></li>
                                <li><NavLink to='/dashboard/registerCamps'>
                                    <FaBook />
                                    Manage Registered Camps</NavLink></li>
                                <li><NavLink to='/dashboard/allUsers'>
                                    <FaUser />
                                    All Users</NavLink></li>
                            </> : <>
                                <li><NavLink to='/dashboard/userProfile'>
                                    <FaAddressCard />
                                    Participant Profile</NavLink></li>
                                <li><NavLink to='/dashboard/analytics'>
                                {/* <FaCalendar /> */}
                                    Analytics</NavLink></li>
                                <li><NavLink to='/dashboard/joinCamps'>
                                    {/* <GrCart /> */}
                                    Registered Camps</NavLink></li>
                                <li><NavLink to='/dashboard/paymentHistory'>
                                    {/* <FaStar /> */}
                                    Payment History</NavLink></li>
                            </>
                        }
                        {/* sheard nave links */}
                        <div className="divider"></div>
                        <li><NavLink to='/'>
                            <FaHome />
                            Home</NavLink></li>
                        <li><NavLink to='/camps'>
                            {/* <FaSearch /> */}
                            Available Camps</NavLink></li>
                    </ul>
                </div>
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;