"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SingleProductCard from "./single-product-card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function MultipleItemCarousel({
  products,
  title1,
  title2,
}: any) {
  return (
    <div>
      <p className=" text-xl font-semibold  tracking-wider uppercase  text-neutral-700">
        {" "}
        {title1} {""}
        <span className=" text-red-500">{title2}</span>{" "}
      </p>
      <div className=" flex mb-4 mt-1">{/* <Separator /> */}</div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {products &&
          products?.map((product: any, index: number) => (
            <div
              key={index}
              className="md:basis-1/2 lg:basis-1/4 hover:-translate-y-1 duration-300"
            >
              <SingleProductCard product={product} />
            </div>
          ))}
      </div>
      {products?.length > 8 && (
        <>
          <div className="flex pt-3 justify-end  ">
            <Separator className="w-1/4 h-1 bg-slate-600" />
          </div>
          <Button className="mt-1 rounded-sm bg-red-500 float-right">
            View More
          </Button>
        </>
      )}
    </div>
  );
}
