import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './AdCarousel.css';
import publi1 from '../assets/images/publi1.jpg';
import publi2 from '../assets/images/publi2.jpg';
import publi3 from '../assets/images/publi3.jpg';

const banners = [publi1, publi2, publi3];

export const AdCarousel = () => {
  return (
    <div className="ad-carousel-container">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}

        pagination={{
          clickable: true,
        }}

        navigation={true}
        
        className="mySwiper"
      >
=
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner} alt={`Publicidade ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};