"use client";
import React, { useEffect, useState } from "react";
import HeroCarousel from "@/components/website/hero-carousel";
import MultipleItemCarousel from "@/components/website/multiple-item-carousel";
import { Button } from "@/components/ui/button";
import SingleProductCard from "@/components/website/single-product-card";
import Link from "next/link";
import CategoryBar from "@/components/categoryBar/Categorybar";
import { Separator } from "@/components/ui/separator";
import Testimonial from "@/components/Testimonial";
import { AxiosInstance } from "@/app/(repositories)/config";
import Image from "next/image";

function HomeClient() {
  const [isLoading2, setisLoading2] = useState<boolean>(false);
  // const [brands, setBrands] = useState<any>();

  // useEffect(() => {
  //   const fetchBrands = async () => {
  //     try {
  //       const res = await AxiosInstance.get("/brands");
  //       setBrands(res?.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchBrands();
  // }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading2(true);
        const res = await AxiosInstance.get("/hero-banners", {
          params: {
            category: "",
          },
        });
        setBanners(res?.data?.data?.results);
        setisLoading2(false);
      } catch (error) {
        console.log(error);
        setisLoading2(false);
      } finally {
        setisLoading2(false);
      }
    };
    fetch();
  }, []);

  const [products, setProducts] = useState<any>();

  const [isLoading, setisLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading(true);
        const res = await AxiosInstance.get(`/products?limit=12`);
        setProducts(res?.data?.data?.results);
        setisLoading(false);
      } catch (error) {
        console.log(error);
        setisLoading(false);
      } finally {
        setisLoading(false);
      }
    };
    fetch();
  }, []);

  const [banners, setBanners] = useState<any>();

  const banner1 = banners?.filter(
    (banner: any) => banner.section === "section-one"
  )[0];
  console.log(banner1);
  const banner2 = banners?.filter(
    (banner: any) => banner.section === "section-two"
  )[0];
  const herosections = banners?.filter(
    (banner: any) => banner.section === "hero-section"
  );

  const [smallBanners, setsmallBanners] = useState<any>();
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading(true);
        const res = await AxiosInstance.get("/small-banners", {
          params: {
            category: "",
          },
        });
        setsmallBanners(res?.data?.data?.results);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetch();
  }, []);

  const [specialProducts, setSpecialProducts] = useState<any>();
  useEffect(() => {
    const fetch = async () => {
      try {
        setisLoading(true);
        const res = await AxiosInstance.get(
          `/products?limit=10&isFeatured=false`
        );
        setSpecialProducts(res?.data?.data?.results);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="relative w-full md:w-11/12 mx-auto space-y-20">
        <MultipleItemCarousel
          title1={"Top Selling"}
          title2={"Products"}
          products={specialProducts}
        />

        <div className="w-full">
          <div
            className="h-52 md:h-[50vh] mt-8 rounded-md"
            style={{
              backgroundImage: `url(${banner1?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="mt-12">
            <p className="text-xl font-semibold tracking-wider uppercase text-red-500">
              Explore <span className="text-neutral-700">Our Products</span>
            </p>
            <div className="flex mt-1 mb-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products?.map((product: any, index: number) => (
              <SingleProductCard key={index} product={product} />
            ))}
          </div>
          {products?.length > 8 && (
            <>
              <div className="flex pt-3 justify-end">
                <Separator className="w-1/4 h-1 bg-slate-600" />
              </div>
              <Button className="mt-1 rounded-sm bg-red-500 float-right">
                View More
              </Button>
            </>
          )}
        </div>

        {smallBanners && (
          <div className="flex flex-col md:flex-row gap-4">
            <div
              style={{
                backgroundImage: `url(${
                  smallBanners && smallBanners[0]?.image
                })`,
                backgroundSize: "contain",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat",
              }}
              className="rounded-md w-full p-4 md:p-12 tracking-wider text-primary-700 bg-primary-100 mb-8 md:mb-0"
            >
              <div className="space-y-3 max-w-sm">
                <p className="font-semibold text-primary-300 text-sm">
                  {smallBanners[0]?.heading}
                </p>
                <p className="text-xl font-medium">{smallBanners[0]?.title}</p>
                <div>
                  <Link href={"shop"}>
                    <Button className="bg-primary-500 hover:bg-primary-600">
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundImage: `url(${
                  smallBanners && smallBanners[1]?.image
                })`,
                backgroundSize: "contain",
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
              }}
              className="rounded-md flex items-center justify-end w-full p-4 md:p-12 tracking-wider text-primary-100 bg-primary-500"
            >
              <div className="space-y-3 text-right">
                <p className="font-semibold text-sm text-primary-100">
                  {smallBanners[1]?.heading}
                </p>
                <p className="text-xl font-medium">{smallBanners[1]?.title}</p>
                <div>
                  <Link href={"shop"}>
                    <Button
                      className="text-primary-500 hover:text-primary-500"
                      variant={"outline"}
                    >
                      Shop Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className=" mt-12">
          <p className=" text-3xl text-center font-semibold mb-8 text-primary-700/80">
            Available Brands
          </p>
          <div className=" grid grid-cols-3 md:grid-cols-7 gap-4">
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
            {brands?.map((brand: any, index: number) => (
              <Image
                key={index}
                src={brand?.image}
                alt=""
                width={150}
                height={150}
                className=" h-16 object-cover border  rounded-md"
              />
            ))}
          </div>
        </div> */}
        <Testimonial />
      </div>
    </>
  );
}

export default HomeClient;
