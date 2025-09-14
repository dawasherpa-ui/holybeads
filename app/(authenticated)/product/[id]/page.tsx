"use client";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import SingleProductRightSection from "@/components/website/single-product-right-section";
import MultipleItemCarousel from "@/components/website/multiple-item-carousel";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AxiosInstance } from "@/app/(repositories)/config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { ShieldCheck, RefreshCcwDot, Banknote } from "lucide-react";

export default function Page() {
  const params = useParams();
  const [product, setProduct] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const res = await AxiosInstance.get(`/products/${params?.id}`);
        setProduct(res?.data?.data);

        if (res?.data) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [params.id]);

  const [products, setProducts] = useState<any>();
  const [isLoading1, setIsLoading1] = useState<boolean>(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading1(true);
        const res = await AxiosInstance.get("/products", {
          params: {
            category: product?.category,
          },
        });
        setProducts(res?.data?.data?.results);

        if (res?.data) {
          setIsLoading1(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [product]);

  const [selectedVariantId, setselectedVariantId] = useState<any>();

  useEffect(() => {
    setselectedVariantId(product?.colors[0]?._id);
  }, [product?.colors]);

  const selectedColor = product?.colors?.find(
    (color: any) => color._id === selectedVariantId
  );

  return (
    <div className="pt-24 w-full md:w-11/12 mx-auto px-4 md:px-0">
      {product && (
        <div className=" ">
          <div className=" flex flex-col md:flex-row  gap-8">
            {selectedColor && (
              <>
                <div className=" block md:hidden w-full md:w-8/12">
                  <div className=" flex">
                    <Swiper
                      pagination={true}
                      modules={[Pagination]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <Image
                          height={1000}
                          width={1000}
                          src={selectedColor.image1 || ""}
                          alt="img"
                        />
                      </SwiperSlide>

                      <SwiperSlide>
                        <Image
                          height={1000}
                          width={1000}
                          src={selectedColor.image2 || ""}
                          alt="img"
                        />
                      </SwiperSlide>

                      <SwiperSlide>
                        <Image
                          height={1000}
                          width={1000}
                          src={selectedColor.image3 || ""}
                          alt="img"
                        />
                      </SwiperSlide>

                      <SwiperSlide>
                        <Image
                          height={1000}
                          width={1000}
                          src={selectedColor.image4 || ""}
                          alt="img"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>

                <div className=" hidden md:flex w-full md:w-8/12">
                  <div>
                    {product?.colors.map((item: any,index:number) => (
                      <div key={index} className="w-20 mb-2 mr-4" onClick={()=>setselectedVariantId(item._id)}>
                        <img src={item.image1} alt={item.name} className="h-full rounded-md w-full object-cover object-top" />
                      </div>
                    ))}
                  </div>
                  <div className=" grid grid-cols-2 gap-4 ">
                    {selectedColor.image1 && (
                      <Image
                        height={1000}
                        width={1000}
                        src={selectedColor.image1 || ""}
                        alt="img"
                        className="rounded-md object-cover h-[58vh]  overflow-hidden border border-primary-100 "
                      />
                    )}
                    {selectedColor.image2 && (
                      <Image
                        height={500}
                        width={500}
                        src={selectedColor.image2 || ""}
                        alt="img"
                        className="rounded-md object-cover h-[58vh]  border border-primary-100"
                      />
                    )}

                    {selectedColor.image3 && (
                      <Image
                        height={500}
                        width={500}
                        src={selectedColor.image3 || ""}
                        alt="img"
                        className="rounded-md object-cover h-[58vh]  border border-primary-100"
                      />
                    )}

                    {selectedColor.image4 && (
                      <Image
                        height={500}
                        width={500}
                        src={selectedColor.image4 || ""}
                        alt="img"
                        className="rounded-md object-cover h-[58vh]  border border-primary-100"
                      />
                    )}
                  </div>
                </div>
              </>
            )}
            <div className=" w-full md:w-5/12">
              <SingleProductRightSection
                product={product}
                setselectedVariantId={setselectedVariantId}
              />
            </div>
          </div>
          
          {/* Product Description Section */}
          <div className="mt-16 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="border-b border-gray-100">
              <div className="flex space-x-8 px-6">
                <button className="py-4 px-2 border-b-2 border-primary-500 text-primary-600 font-medium text-sm">
                  Description
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Main Description */}
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description || product.note || "Experience premium quality and exceptional comfort with this carefully crafted piece. Made from the finest materials and designed with attention to detail, this product combines style, durability, and functionality to meet your everyday needs."}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Key Features</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        Premium quality materials
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        Comfortable fit and feel
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        Durable construction
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                        Easy maintenance
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="text-gray-900 font-medium">{product?.category?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Available Sizes:</span>
                        <span className="text-gray-900 font-medium">{product.sizes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Colors Available:</span>
                        <span className="text-gray-900 font-medium">{product?.colors?.length} options</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="text-primary-600 font-semibold">Rs. {product.sp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Care Instructions */}
              <div className="bg-gray-50 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-primary-500" />
                  Care & Maintenance
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="space-y-1">
                    <p>• Follow care label instructions</p>
                    <p>• Store in a cool, dry place</p>
                  </div>
                  <div className="space-y-1">
                    <p>• Avoid direct sunlight when drying</p>
                    <p>• Handle with care to maintain quality</p>
                  </div>
                </div>
              </div>
              
              {/* Quality Assurance */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShieldCheck size={16} className="text-green-500" />
                    <span>Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <RefreshCcwDot size={16} className="text-blue-500" />
                    <span>30-Day Return Policy</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Banknote size={16} className="text-purple-500" />
                    <span>Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className=" grid grid-cols-1  lg:grid-cols-2 gap-8 text-neutral-700 space-y-1 cursor-pointer animate-pulse ">
          <div className=" h-96 bg-gray-300"></div>
          <div className=" h-96 bg-gray-300"></div>
        </div>
      )}

      <div className=" mt-12">
        <MultipleItemCarousel
          title1={"Similar"}
          title2={"Products"}
          products={products}
        />

        {isLoading1 && (
          <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 ">
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
          </div>
        )}
      </div>
    </div>
  );
}
