import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './MovieImages.css'
import { useRecoilState } from 'recoil';
import { movieDataState } from '../../Atoms/movieAtom';
import axios from 'axios';
import { imageUrl } from '../../urls/urls';

const MovieImageSwiper = () => {
  const [movie, setMovie] = useRecoilState(movieDataState)

  const [image, setImage] = useState(null)

  useEffect(() => {
    if (movie) {
      axios.get(`${import.meta.env.VITE_TMDB_URL}/movie/${movie.id}/images?api_key=${import.meta.env.VITE_API_KEY}`)
      .then((response) => {
        setImage(response.data.backdrops)
      })
      .catch(error => console.error(error))
    }

  }, [movie])

  return (
    <>
      {
        movie ? (
          <Container>
            <div className='image_container'>
              <div className="image_header">
                <h2>IMAGES</h2>
              </div>
              <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation={{
                  clickable: true, // Optional (make arrows clickable)
                  nextEl: '.swiper-button-next', // Optional selector for customization
                  prevEl: '.swiper-button-prev', // Optional selector for customization

                }}
                autoplay={{ // Autoplay configuration
                  delay: 3000, // Delay between transitions (in milliseconds)
                  disableOnInteraction: false, // Pause autoplay on user interaction (default: true)
                  disableClass: 'your-autoplay-disabled-class', // Optional class when autoplay is disabled
                }}
                
              >

                {
                  image && image.map((obj) => {
                    return (
                      <SwiperSlide key={obj.file_path}>
                        <div className='image_box'>
                          <img src={`${imageUrl + obj.file_path}`} alt="avatar-image" />
                        </div>
                      </SwiperSlide>
                    )
                  })
                }

              </Swiper>
            </div>
          </Container>
        ) : null
      }
    </>
  )
}

export default MovieImageSwiper