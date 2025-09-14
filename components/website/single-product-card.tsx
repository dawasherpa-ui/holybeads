"use client";
import Image from "next/image";
import React, { useState } from "react";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export default function SingleProductCard({ product }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {product && (
        <div>
          <Link href={`/product/${product.productId}`} className="">
            <div 
              className="shadow-md border border-primary-100 rounded-xl cursor-pointer relative overflow-hidden h-[350px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Full Background Image */}
              <Image
                src={isHovered ? product.banner1 : product.banner2}
                alt="img"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                width={500}
                height={500}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl"></div>
              
              {/* Discount Ribbon */}
              <div className="absolute -top-2 -right-2 z-20">
                <div className="bg-red-500 text-white text-xs font-bold py-2 px-10 transform rotate-45 translate-x-8 translate-y-4 shadow-lg">
                  20% OFF
                </div>
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 space-y-2">
                {/* Colors */}
                <div className="flex space-x-1">
                  {product?.colors?.map((color: any, index: number) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border-2 border-white/50"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                  ))}
                </div>

                {/* Product Name */}
                <p className="capitalize font-medium text-lg">{product.name}</p>
                
                {/* Price */}
                <div className="flex items-center justify-between">
                  <p>
                    <span className="font-bold text-xl text-white">
                      Rs.{product.sp}
                    </span>{" "}
                    <span className="line-through text-sm text-white/70">
                      Rs.{product.sp + 0.2 * product.sp}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}
