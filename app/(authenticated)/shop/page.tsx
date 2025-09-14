"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SingleProductCard from "@/components/website/single-product-card";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AxiosInstance } from "@/app/(repositories)/config";
import { Suspense } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import noProductFoundImage from "../../../public/no-product-found.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Page() {
  const searchParams: any = useSearchParams();
  //search
  const search = searchParams.get("category");

  const [categories, setCategories] = useState<any>();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AxiosInstance.get("/categories");
        setCategories(res?.data?.data?.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  function capitalizeWords(str: string) {
    return str
      ?.split(/[-\s]/)
      ?.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      ?.join(" ");
  }

  const selectedCategory = capitalizeWords(searchParams.get("category"));

  const [currentCategory, setCurrentCategory] = useState<any>(selectedCategory);
  const [products, setProducts] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get("/products");
        setProducts(res?.data?.data?.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [currentCategory, search]);

  // filter product based on selectedCategory and category.name of the products  ans if selectedCategory === All then show all products
  const filteredProducts = products?.filter(
    (product: any) => product?.category?.name === selectedCategory
  );
  const pathname = usePathname();

  return (
    <div className="w-full md:w-11/12 mx-auto px-4 pt-24">
      <Suspense>
        <div className=" flex flex-col lg:flex-row  gap-5   ">
          <div className="w-full lg:w-3/12   hidden md:block flex-wrap z-10  ">
            <Button>
              <ArrowLeft />
              Back to home
            </Button>
            <div className=" py-2 px-5 flex gap-2 shadow-md items-center rounded-full my-6 text-base text-primary-500 font-semibold tracking-wider uppercase w-fit">
              <Icon icon="ion:grid-sharp" className="text-xl" /> All Category
            </div>
            <ScrollArea className=" overflow-auto">
              <div className=" flex flex-col ">
                <Link
                  href={"/shop"}
                  className={`${
                    selectedCategory === undefined
                      ? "text-red-500 font-semibold "
                      : "  text-neutral-700 cursor-pointer   hover:text-primary-500 hover:translate-x-1 duration-300"
                  } mt-1 text-base tracking-wider font-medium py-1.5 px-2`}
                >
                  All Products
                </Link>

                {categories?.map((category: any, index: number) => (
                  <Link
                    href={`/shop?category=${category.name}`}
                    className={`${
                      selectedCategory === category.name
                        ? "text-red-500 font-semibold "
                        : "  text-neutral-700 cursor-pointer   hover:text-primary-500 hover:translate-x-1 duration-300"
                    } mt-1 text-sm tracking-wider font-medium py-1.5 px-2 flex gap-2 items-center`}
                    key={index}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className={` ${
                        selectedCategory === category.name
                          ? "border-red-500 border-2"
                          : " border-none"
                      } h-10 w-10 object-cover object-top rounded-full`}
                    />
                    {category.name}
                  </Link>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="block md:hidden z-10">
            <Carousel>
              <CarouselContent>
                {categories && (
                  <CarouselItem className="basis-1/6">
                    <Link
                      href={"/shop"}
                      className=" text-primary-100 mx-2 text-sm flex items-center justify-center flex-col  mb-4 "
                    >
                      <Image
                        src={categories[1]?.image}
                        alt="img"
                        height={100}
                        width={100}
                        className={`${
                          selectedCategory === undefined
                            ? " border border-teal-500"
                            : "border border-teal-500"
                        } rounded-full bg-primary-100  h-10 w-10 object-cover`}
                      />

                      <span
                        className={`${
                          selectedCategory === undefined
                            ? "  text-teal-500 "
                            : "text-primary-500"
                        } text-[10px] font-medium  text-center leading-3 mt-2`}
                      >
                        All Products
                      </span>
                    </Link>
                  </CarouselItem>
                )}

                {categories?.map((category: any, index: number) => (
                  <CarouselItem key={index} className="basis-1/6">
                    <Link
                      key={index}
                      href={`/shop?category=${category.name}`}
                      className=" text-primary-100  text-sm flex items-center  flex-col  h-20 "
                    >
                      <Image
                        src={category.image}
                        alt="img"
                        height={100}
                        width={100}
                        className={`${
                          category.name === selectedCategory
                            ? " border border-teal-500"
                            : ""
                        } rounded-full bg-primary-100  h-10 w-10 object-cover`}
                      />
                      <span
                        className={`${
                          category.name === selectedCategory
                            ? " text-teal-500"
                            : ""
                        } text-primary-500 text-[10px] font-medium  text-center leading-3 mt-2`}
                      >
                        {category.name}
                      </span>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className=" w-full lg:w-9/12  grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 min-h-screen z-10">
            <>
              {selectedCategory == undefined ? (
                <>
                  {products?.map((product: any, index: number) => (
                    <SingleProductCard key={index} product={product} />
                  ))}
                </>
              ) : (
                <>
                  {filteredProducts?.map((product: any, index: number) => (
                    <SingleProductCard key={index} product={product} />
                  ))}
                </>
              )}
              {products?.length === 0 &&
                !isLoading &&
                selectedCategory == undefined && (
                  <div className="absolute  w-9/12 flex items-end justify-center h-[50vh] ">
                    <Image
                      src={noProductFoundImage}
                      alt="img"
                      height={500}
                      width={500}
                      className=" h-56 object-scale-down"
                    />
                  </div>
                )}
            </>

            {/* <>
              {selectedCategory == undefined ? (
                <>
                  {products?.length === 0 && !isLoading && (
                    <Image
                      src={noProductFoundImage}
                      alt="no-product-found"
                      height={500}
                      width={500}
                      className="  mx-auto"
                    />
                  )}
                </>
              ) : (
                <div className=" w-full lg:w-9/12 flex items-center justify-center">
                  {filteredProducts?.length === 0 && !isLoading && (
                    <Image
                      src={noProductFoundImage}
                      alt="no-product-found"
                      height={500}
                      width={500}
                      className="  mx-auto"
                    />
                  )}
                </div>
              )}
            </> */}

            {isLoading && (
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-primary-100 rounded-xl p-2 text-neutral-700 space-y-1 cursor-pointer animate-pulse"
                  >
                    <div className=" h-72  bg-gray-300 rounded-xl"></div>

                    <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>

                    <div className="h-6 w-40 bg-gray-300 rounded mb-2"></div>

                    <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>

                    <div className=" flex items-center justify-between">
                      <div className="h-4 w-20 bg-gray-300 rounded"></div>

                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* {filteredProducts?.length === 0 && !isLoading && (     <div className=" w-full lg:w-9/12 flex items-center justify-center  min-h-screen">
            <Image
              src={noProductFoundImage}
              alt="img"
              height={500}
              width={500}
              className=" h-56 object-scale-down"
            />
          </div>
          )} */}
          {filteredProducts?.length === 0 &&
            !isLoading &&
            selectedCategory != undefined && (
              <div className="absolute  w-9/12 flex items-end justify-center h-[50vh] ">
                <Image
                  src={noProductFoundImage}
                  alt="img"
                  height={500}
                  width={500}
                  className=" h-56 object-scale-down"
                />
              </div>
            )}
        </div>
      </Suspense>
    </div>
  );
}
