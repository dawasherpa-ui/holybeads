'use client'

import React from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import CategoryItem from './CategoryItem'

const Carousel = dynamic(() => import('../carousel/Carousel'), { ssr: false })

interface Category {
  categoryId: string
  name: string
  image: string
}

interface ClientCategoryBarProps {
  categories: Category[]
}

export default function ClientCategoryBar({ categories }: ClientCategoryBarProps) {
  return (
    <div className="w-[80%]">
      <Carousel>
        {categories.map((category, key) => (
          <CategoryItem
            link={`/category/${category.categoryId}`}
            name={category?.name}
            img={category?.image}
            key={key}
          />
        ))}
      </Carousel>
    </div>
  )
}