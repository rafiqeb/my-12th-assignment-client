import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import banner1 from '../assets/banner 1.jpg'
import banner2 from '../assets/banner 2.jpg'
import banner3 from '../assets/banner 3.jpg'
import banner4 from '../assets/banner 4.jpg'

const Banner = () => {
    return (
        <div className=''>
            <div className='py-10 px-2'>
                <Swiper
                    pagination={{
                        type: 'fraction',
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Pagination, Autoplay, Navigation]}
                    className="mySwiper mt-10"
                >
                    <SwiperSlide><img className='w-full lg:h-[620px]' src={banner1} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full lg:h-[620px]' src={banner2} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full lg:h-[620px]' src={banner3} alt="" /></SwiperSlide>
                    <SwiperSlide><img className='w-full lg:h-[620px]' src={banner4} alt="" /></SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Banner;