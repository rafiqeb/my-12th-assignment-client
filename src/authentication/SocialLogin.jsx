import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic()
    const { signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        toast.success('Signin Successful')
                        navigate(location?.state ? location.state : '/')
                    })
            })
            .catch(error => {
                toast.error(error?.message)
            })
    }

    return (
        <div>
            <button type="button"
                onClick={handleGoogleLogin}
                className="px-4 py-2 rounded-lg w-full border border-blue-300 flex justify-center items-center gap-6">
                <p className="text-2xl"><FcGoogle /></p>
                <h4 className="font-semibold">Login with Google</h4>
            </button>
        </div>
    );
};

export default SocialLogin;