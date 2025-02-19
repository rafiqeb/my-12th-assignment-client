import { useNavigate } from 'react-router-dom';
import image from '../assets/error page.avif'
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Helmet><title>Medical Camp | Error</title></Helmet>
            <h2 className='text-3xl font-bold text-center mt-8'>Opps! This page is not found</h2>
            <div className='flex justify-center items-center mt-4'>
                <img className='w-[480px] h-[480px]' src={image} alt="" />
            </div>
            <div className='flex justify-center items-center mt-4'>
                <button onClick={() => navigate('/')} className='btn btn-primary'>Back Home</button>
            </div>
        </div>
    );
};

export default ErrorPage;