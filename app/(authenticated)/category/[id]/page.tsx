"use client";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { AxiosInstance } from "@/app/(repositories)/config";
import React from "react";
import Link from "next/link";

export default function Page({ params }: any) {
  console.log(params.id);
  const [category, setCategory] = React.useState<any>();
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AxiosInstance.get(`/categories/${params.id}`);
        setCategory(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [params.id]);

  console.log(category);

  const [subcategories, setSubcategories] = React.useState<any>();
  React.useEffect(() => {
    const fetch = async () => {
      try {
        const res = await AxiosInstance.get(`/subcategories/?parent=${category?._id}`);
        setSubcategories(res?.data?.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [category?._id]);

  console.log(subcategories);

  return (
    <div className="">
      <div className=" relative flex items-center justify-center ">
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-[0.7] z-10"></div>
        <div className="space-y-3 text-center absolute px-4  z-10">
          <h1 className="text-3xl md:text-6xl text-white/80 font-semibold">{category?.name}</h1>
        </div>

        <Image
          src={category?.banner}
          alt="faq"
          className=" w-full h-[30vh] md:h-[90vh] object-top object-cover "
          height={1000}
          width={1000}
        />
      </div>
      <div className="w-full md:w-11/12 mx-auto px-4 mt-12">
        <h2 className="font-manrope font-bold text-2xl text-center md:text-3xl text-gray-800 mb-8 max-xl:text-center">Shop by category</h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {subcategories &&
            subcategories?.map((subcategory: any, index: number) => (
              <Link
                key={index}
                href={`/category/${params.id}/subcategory/${subcategory.subcategoryId}`}
                className="relative bg-cover group rounded-lg bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer"  style={{ width: '100%', height: '100%' }}>
               <div className="relative w-full h-full">
               <Image
                  src={subcategory.image}
                  alt="img"
                  height={500}
                  width={500}
                   className="object-cover w-full h-full "
                />
               
                <div className="absolute z-10 bottom-3 left-0 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-lg shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
                  <div className="flex items-center justify-between ">
                    <h6 className="font-semibold text-base leading-7 text-gray-700">{subcategory.name}</h6>
                    <h6 className=" text-sm leading-7 text-indigo-600 text-right flex items-center">
                      Explore <ChevronRight size={16} />
                    </h6>
                  </div>
                </div>
               </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
