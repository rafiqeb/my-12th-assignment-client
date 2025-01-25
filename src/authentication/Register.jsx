import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";


const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const Register = () => {
    const { creatUser, updateUserProfile, setUser } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const location = useLocation()

    const handleRegister = async(e)=> {
        e.preventDefault();
        const form = e.target
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;

         // password regex
         if (!passwordRegex.test(password)) {
            toast.error('Password must be at least 6 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character')
            return;
        }

        try {
            const result = await creatUser(email, password)
            await updateUserProfile(name, photo)
            // setUser({ ...result.user, photoURL: photo, displayName: name })
            const userInfo = {
                name: name,
                email: email,
                image: photo,
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                if (res.data.insertedId) {
                    form.reset()
                    Swal.fire({
                        title: 'Success!',
                        text: 'Registration successfully',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    navigate(location?.state ? location.state : '/')
                }
            })
        } catch (error) {
            toast.error(error?.message)
        }
    }
    return (
        <div>
            {/* <Helmet><title>Registration Page</title></Helmet> */}
            <div>
                <h2 className="text-3xl font-bold text-center mt-6">Register your account</h2>
                <div className="max-w-lg mx-auto bg-base-200 p-10 shadow-xl rounded-xl">
                    <form onSubmit={handleRegister}>
                        <SocialLogin></SocialLogin>
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Name:</h3>
                            <input type="text" name="name" placeholder="name"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Email:</h3>
                            <input type="email" name="email" placeholder="email"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mt-4">Photo:</h3>
                            <input type="text" name="photo" placeholder="photo url"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div className="relative">
                            <h3 className="text-lg font-semibold mt-4">Password:</h3>
                            <input type="password" name="password" placeholder="password"
                                className="px-4 py-2 rounded-lg w-full border border-blue-300" />
                        </div>
                        <div>
                            <input type="submit" value="Register" className="px-4 py-2 rounded-lg w-full bg-blue-700 text-white font-semibold mt-6" />
                        </div>
                        <p className="text-center mt-6">
                            Already have an account? Please <Link className="text-blue-700 font-bold" to='/login'>Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;