'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Carousel({ children }: { children: React.ReactNode }) {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      spaceBetween={30}
      slidesPerView={'auto'}
      pagination={{ clickable: true }}
      navigation={false}
      breakpoints={{
        0: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        600: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        3000: {
          slidesPerView: 6,
          spaceBetween: 40,
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}