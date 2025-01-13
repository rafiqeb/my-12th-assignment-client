import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)

    const links = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='camps'>Available Camps</Link></li>
        <li><Link to='dashboard'>Dashboard</Link></li>
        {!user && <li><Link to='/login'>Join us</Link></li>}
    </>

    const links2 = <>
        <li><Link to='/'>Home</Link></li>
        {
            user ? <>
                <li onClick={logOut}><Link>Log out</Link></li>
            </> : <>
                <li><Link to='/login'>Join us</Link></li>
            </>
        }
    </>

    return (
        <div>
            <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-40 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                {/* dropdown */}
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user && user?.photoURL ? (<img
                                    referrerPolicy="no-referrer" className="w-[40px] h-[40px] rounded-full" src={user.photoURL} alt="" />) : (<p className="text-4xl"><FaUserCircle /></p>)}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                            {links2}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;