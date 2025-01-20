import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const Feedback = () => {
    const axiosPublic = useAxiosPublic()
    const [feedbacks, setFeedbacks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosPublic.get('/feedback')
            setFeedbacks(res.data);
        }
        fetchData()
    }, [axiosPublic])

    return (
        <div>
            <h2 className="text-3xl font-bold text-center">Feedback and Ratings</h2>
            <div className="mt-16 mb-10">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        feedbacks.map((item) => (<SwiperSlide key={item._id}>
                            <div className='flex flex-col items-center gap-4'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={item.rating}
                                    readOnly
                                />
                                <div className="text-4xl"><FaQuoteLeft /></div>
                                <p>{item.feedback}</p>
                            </div>
                        </SwiperSlide>))
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Feedback;