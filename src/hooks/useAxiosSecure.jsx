import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthProvider";
import { useNavigate } from "react-router-dom";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate()

    // request interceptore
    axiosSecure.interceptors.request.use((config)=> {
        const token = localStorage.getItem('access-token')
        // console.log('request stoped', token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (error)=> {
        return Promise.reject(error);
    })

    // interceptore response
    axiosSecure.interceptors.response.use((response)=> {
        return response;
    }, async(error)=> {
        const status = error.response.status;
        // console.log('status error', status);
        if(status === 401 || status === 403){
           await logOut()
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;