import React from 'react'
import ClientCategoryBar from './ClientCategoryBar'
import { dummyCategories } from '@/lib/dummyData'

export default function CategoryBar() {
  // Using dummy data instead of API call
  const categories = dummyCategories

  return (
    <div className="sticky top-[61px] z-[9999] bg-white flex flex-col lg:flex-row gap-2 lg:gap-0 px-2 py-2 lg:px-12 lg:py-2 shadow-lg overflow-hidden">
      <div className="hidden lg:flex lg:basis-[15%] flex-shrink-0 justify-center items-center">
        <span className="text-center text-md md:text-lg 2xl:text-2xl font-bold">
          OUR  
          CATEGORIES
        </span>
      </div>
      <div className="flex-1 min-w-0 w-full">
        <ClientCategoryBar categories={categories} />
      </div>
    </div>
  )
}