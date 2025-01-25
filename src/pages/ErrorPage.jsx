import { useNavigate } from 'react-router-dom';
import image from '../assets/error.jpg'
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Helmet><title>Medical Camp | Error</title></Helmet>
            <div className='flex justify-center items-center mt-10'>
                <img className='w-[480px] h-[480px]' src={image} alt="" />
            </div>
            <div className='flex justify-center items-center mt-4'>
                <button onClick={() => navigate('/')} className='btn btn-warning'>Back Home</button>
            </div>
        </div>
    );
};

export default ErrorPage;