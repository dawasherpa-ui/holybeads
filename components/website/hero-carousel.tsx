"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import defaultBanner from "../../public/default-banner.png";

export default function HeroCarousel({ banners }: any) {
  const OPTIONS: EmblaOptionsType = { loop: true };
  // EmblaOptionsType.loop = true;
  return (
    <Carousel
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
        // OPTIONS
      ]}
      className=" md:h-[calc(100vh-180px)]"
      style={{ marginTop: "0px" }}
    >
      <CarouselContent>
        {banners?.map((item: any, index: any) => (
          <CarouselItem key={index} className="relative md:h-[calc(100vh-180px)]">
            <Image
              height={1000}
              width={2000}
              priority
              src={item.image}
              className="h-full w-full object-cover object-top"
              alt="img"
            />
            {/* Overlay content */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {item.title || "Welcome to Holy Beads"}
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  {item.subtitle || "Discover our beautiful collection of spiritual jewelry and accessories"}
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                >
                  {item.buttonText || "Shop Now"}
                </Button>
              </div>
            </div>
          </CarouselItem>
        ))}

        {!banners && (
          <CarouselItem className="relative md:h-[calc(100vh-180px)]">
            <Image
              height={1000}
              width={2000}
              priority
              src={defaultBanner}
              className="h-full w-full object-cover object-top"
              alt="img"
            />
            {/* Default overlay content */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white px-4 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Welcome to Holy Beads
                </h1>
                <p className="text-lg md:text-xl mb-8 opacity-90">
                  Discover our beautiful collection of spiritual jewelry and accessories
                </p>
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className=" ms-14" />
      <CarouselNext className=" me-14" />
    </Carousel>
  );
}
