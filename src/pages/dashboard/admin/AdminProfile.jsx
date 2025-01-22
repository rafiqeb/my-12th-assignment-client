import { useContext } from "react";
import { AuthContext } from "../../../authentication/AuthProvider";


const AdminProfile = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
           admin profile 
        </div>
    );
};

export default AdminProfile;