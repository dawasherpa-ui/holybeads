'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SubCategory, Product } from "@/lib/dummyData";

interface CategoryItemProps {
  img: string;
  name: string;
  link: string;
  subCategories?: SubCategory[];
}

function CategoryItem({ link, name, img, subCategories }: CategoryItemProps) {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [currentPage, setCurrentPage] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const PRODUCTS_PER_PAGE = 8;

  // Set first subcategory with products as default when dropdown opens
  useEffect(() => {
    if (open && subCategories && subCategories.length > 0 && !selectedSubCategory) {
      const firstWithProducts = subCategories.find(
        (sub) => sub.products && sub.products.length > 0
      );
      if (firstWithProducts) {
        setSelectedSubCategory(firstWithProducts.subCategoryId);
      }
    }
    if (!open) {
      setSelectedSubCategory(null);
      setCurrentPage(0);
    }
  }, [open, subCategories, selectedSubCategory]);

  // Reset page when subcategory changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedSubCategory]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && triggerRef.current) {
      // Get the category bar container position
      const categoryBar = triggerRef.current.closest('.sticky');
      if (categoryBar) {
        const rect = categoryBar.getBoundingClientRect();
        setPosition({
          top: rect.bottom - 8, // Use rect.bottom directly for sticky elements, -1px to overlap
          left: rect.left,
          width: rect.width
        });
      }
    }
  }, [open]);

  return (
    <div
      ref={triggerRef}
      className="relative"
      onMouseEnter={() => {
        // Only open dropdown on desktop (lg and above)
        if (window.innerWidth >= 1024) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => setOpen(false)}
    >
      <Link href={link}>
        <div className="flex flex-row gap-1 sm:gap-2 border items-center bg-[#f3f3f3] p-1 rounded-md hover:bg-[#e8e8e8] transition-colors">
          <div className="flex justify-center w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-slate-100 hover:bg-slate-200 rounded-lg">
            <Image
              className="w-full h-full rounded-sm object-cover object-top"
              src={img}
              width={100}
              height={100}
              alt={name}
            />
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <h2 className="text-xs sm:text-sm lg:text-base lg:leading-4 font-semibold text-black/90 line-clamp-1">{name}</h2>
              <span className="text-[10px] sm:text-[12px] font-medium">Collection</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Subcategories & Products Dropdown - Rendered via Portal */}
      {mounted && open && subCategories && subCategories.length > 0 && createPortal(
        <div 
          className="fixed z-[10000]"
          style={{ 
            top: `${position.top}px`, 
            left: `${position.left}px`,
            width: `${position.width}px`,
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="bg-white shadow-2xl border border-gray-200 flex max-h-[500px] ">
            {/* Subcategories List - Left Side */}
            <div className="w-1/4 border-r border-gray-200 overflow-y-auto">
              {subCategories
                .filter((subCategory) => subCategory.products && subCategory.products.length > 0)
                .map((subCategory) => (
                  <div
                    key={subCategory.subCategoryId}
                    onMouseEnter={() => setSelectedSubCategory(subCategory.subCategoryId)}
                    className={`px-4 py-3 cursor-pointer transition-colors ${
                      selectedSubCategory === subCategory.subCategoryId
                        ? 'bg-gray-100 border-l-4 border-gray-800'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Link
                      href={`${link}/subcategory/${subCategory.subCategoryId}`}
                      className="block"
                    >
                      <h3 className="text-sm font-semibold text-gray-900">
                        {subCategory.name}
                      </h3>
                      {subCategory.products && (
                        <p className="text-xs text-gray-500 mt-1">
                          {subCategory.products.length} {subCategory.products.length === 1 ? 'product' : 'products'}
                        </p>
                      )}
                    </Link>
                  </div>
                ))}
            </div>

            {/* Products Display - Right Side */}
            <div className="flex-1 p-4 overflow-y-auto relative">
              {(() => {
                const activeSubCategory = subCategories.find(
                  (sub) => sub.subCategoryId === selectedSubCategory
                );
                
                if (!activeSubCategory) return null;

                const products = activeSubCategory.products || [];
                const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
                const startIndex = currentPage * PRODUCTS_PER_PAGE;
                const endIndex = startIndex + PRODUCTS_PER_PAGE;
                const currentProducts = products.slice(startIndex, endIndex);

                return (
                  <div className="relative">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      {activeSubCategory.name}
                    </h2>
                    
                    {products.length > 0 ? (
                      <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
                          {currentProducts.map((product) => (
                            <Link
                              key={product.productId}
                              href={`${link}/product/${product.productId}`}
                              className="group"
                            >
                              <div className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-shadow">
                                <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                </div>
                                <h4 className="text-sm font-medium text-gray-800 truncate">
                                  {product.name}
                                </h4>
                                <p className="text-sm font-semibold text-gray-900 mt-1">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Navigation Arrows - Bottom Right */}
                        {totalPages > 1 && (
                          <div className="absolute bottom-4 right-4 flex items-center gap-2">
                            <button
                              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                              disabled={currentPage === 0}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                              aria-label="Previous products"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-xs text-gray-600 font-medium">
                              {currentPage + 1} / {totalPages}
                            </span>
                            <button
                              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                              disabled={currentPage === totalPages - 1}
                              className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                              aria-label="Next products"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-400 italic">No products available in this subcategory</p>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
export default CategoryItem;
