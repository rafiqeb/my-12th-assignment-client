import axios from "axios";



const axiosPublic = axios.create({
    baseURL: 'https://my-12th-assignment-server-seven.vercel.app/'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;