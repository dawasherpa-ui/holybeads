'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import CategoryItem from './CategoryItem'
import { Category } from '@/lib/dummyData'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Carousel = dynamic(() => import('../carousel/Carousel'), { ssr: false })

interface ClientCategoryBarProps {
  categories: Category[]
}

export default function ClientCategoryBar({ categories }: ClientCategoryBarProps) {
  const swiperRef = useRef<any>(null)

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  return (
    <div className="w-full flex items-center gap-1 sm:gap-2 lg:gap-3">
      {/* Previous Arrow */}
      <button
        onClick={handlePrev}
        className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors shadow-sm z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      {/* Carousel */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <Carousel swiperRef={swiperRef}>
          {categories.map((category, key) => (
            <CategoryItem
              link={`/category/${category.categoryId}`}
              name={category?.name}
              img={category?.image}
              subCategories={category?.subCategories}
              key={key}
            />
          ))}
        </Carousel>
      </div>

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors shadow-sm z-10"
        aria-label="Next"
      >
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  )
}