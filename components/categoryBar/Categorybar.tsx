import React from 'react'
import { AxiosInstance } from '@/app/(repositories)/config'
import ClientCategoryBar from './ClientCategoryBar'
import axios from 'axios'

async function fetchCategory() {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_URL_API+"/categories")
    return res?.data?.data?.results || []
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function CategoryBar() {
  const categories = await fetchCategory()

  return (
    <div className="flex lg:px-12 lg:py-2 shadow-lg px-2 py-2">
      <div className="basis-[15%] justify-center items-center lg:flex">
        <span className="text-center text-md md:text-lg 2xl:text-2xl font-bold ">
          OUR  
          CATEGORIES
        </span>
      </div>
      <div className="basis-[100%] lg:basis-[80%] flex w-full">
        <ClientCategoryBar categories={categories} />
      </div>
    </div>
  )
}