import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../authentication/AuthProvider";
import { FaUserCircle } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light')

    const handleTogle = (e) => {
        if (e.target.checked) {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const localTheme = localStorage.getItem('theme')
        document.querySelector('html').setAttribute('data-theme', localTheme)
    }, [theme])

    const links = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='camps'>Available Camps</Link></li>
        {user && <li><a href="#popularCamps">Popular Camps</a></li>}
        {user && <li><a href="#recentCamps">Recent Camps</a></li>}
        {user && <li><a href="#feedback">Feedback</a></li>}
        {!user && <li><Link to='/login'>Join us</Link></li>}
    </>

    const links2 = <>
        {user && <li>{user?.displayName}</li>}
        <li className="lg:hidden"><Link to='/'>Home</Link></li>
        <li className="lg:hidden"><Link to='camps'>Available Camps</Link></li>
        {isAdmin ? <li><Link to='/dashboard/adminProfile'>Dashboard</Link></li> : <li><Link to='/dashboard/userProfile'>Dashboard</Link></li>}
        {user && <li className="lg:hidden"><a href="#popularCamps">Popular Camps</a></li>}
        {user && <li className="lg:hidden"><a href="#recentCamps">Recent Camps</a></li>}
        {user && <li className="lg:hidden"><a href="#feedback">Feedback</a></li>}
        {
            user ? <>
                <li onClick={logOut}><Link>Log out</Link></li>
            </> : <>
                <li className="lg:hidden"><Link to='/login'>Join us</Link></li>
            </>
        }
    </>

    return (
        <div>
            <div className="navbar max-w-screen-xl fixed z-10 bg-opacity-80 bg-base-100">
                <div className="navbar-start">
                    <div className="btn btn-sm">
                        <label className="swap swap-rotate animate-[spin_4s_linear_infinite]">
                            {/* this hidden checkbox controls the state */}
                            <input onChange={handleTogle} type="checkbox" className="theme-controller" value="synthwave" />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-6 w-6 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-6 w-6 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </div>
                    <a className="btn btn-ghost text-xl">HealthAid Camp</a>
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