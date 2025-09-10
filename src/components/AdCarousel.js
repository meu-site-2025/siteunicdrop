import React from 'react';

// Importe os módulos do Swiper que vamos usar
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importe os estilos CSS do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importe o seu arquivo CSS personalizado para o carrossel
import './AdCarousel.css';

// Importe suas imagens
import publi1 from '../assets/images/publi1.jpg';
import publi2 from '../assets/images/publi2.jpg';
import publi3 from '../assets/images/publi3.jpg';

// Crie uma lista com as imagens para facilitar
const banners = [publi1, publi2, publi3];

export const AdCarousel = () => {
  return (
    <div className="ad-carousel-container">
      <Swiper
        // Módulos que estamos ativando
        modules={[Autoplay, Pagination, Navigation]}
        
        // Configurações do Carrossel
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        centeredSlides={true}

        // Configuração do Autoplay
        autoplay={{
          delay: 3000, // Tempo em milissegundos (3.5 segundos)
          disableOnInteraction: false, // Continua automático mesmo depois de interação manual
        }}
        
        // Paginação (as bolinhas inferiores)
        pagination={{
          clickable: true,
        }}
        
        // Navegação (as setas laterais)
        navigation={true}
        
        className="mySwiper"
      >
        {/* Mapeia a lista de banners para criar os slides */}
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner} alt={`Publicidade ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};