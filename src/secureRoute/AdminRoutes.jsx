import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";


const AdminRoutes = () => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation()

    if (loading || isAdminLoading) {
        return (<div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>)
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default AdminRoutes;