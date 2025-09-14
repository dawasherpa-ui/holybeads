"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import LogoImage from "@/public/logo.svg";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Separator } from "../ui/separator";
function Footer() {
  const data = {
    offerHeader: "Get up to 15% Membership Offer",
    offerSubHeading: "Be our regular buyer and get amazing gift hampers",
  };
  const currentDate=new Date().getFullYear();
  return (
    <div className="bg-brand pt-12 mt-20 pb-8 w-full flex flex-col overflow-hidden">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between">
        <div className="firstCol basis-[30%] mb-2 lg:mb-0 flex flex-col">
          <div className="w-full h-[40px] mb-6">
            <Image
              className="w-full h-full object-contain object-left"
              src={LogoImage}
              alt=""
            />
          </div>
          <div className="flex flex-col mb-4">
            <span className="text-[#575757] hover:text-[#942] hover:font-semibold">
              Head Office: Satdobato,
            </span>
            <span className="text-[#575757] hover:text-[#942] hover:font-semibold">
              Lalitpur, Nepal
            </span>
          </div>

          <div className=" flex flex-col mb-4">
            <span className="text-[#575757] hover:text-[#942] hover:font-semibold">
            holybeads@gmail.com
            </span>
            <span className="text-[#575757] hover:text-[#942] hover:font-semibold">
              +977 987654321
            </span>
          </div>

          <div className="flex items-center">
            <Link href={"https://www.facebook.com/holybeads9/"} className="mr-4">
              <Icon
                className="text-2xl text-black"
                icon="ic:baseline-facebook"
              />
            </Link>
            <Link href={"https://www.instagram.com/jackets_house"} className="mr-4">
              <Icon className="text-2xl text-black" icon="mdi:instagram" />
            </Link>
            <Link href={"#"} className="mr-4">
              <Icon className="text-2xl text-black" icon="ic:baseline-tiktok" />
            </Link>
          </div>
        </div>

        <div className="secondColumn basis-[15%] flex flex-col mt-4 lg:mt-0 mb-4 lg:mb-0">
          <h3 className="mb-2 md:mb-4 lg:mb-8 uppercase text-black font-semibold ">
            COMPANY
          </h3>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/about"}
          >
            About Us
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/shop"}
          >
            Shop
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/offers"}
          >
           Offers
          </Link>
        </div>

        <div className="thirdColumn text-[#575757] basis-[15%] mb-4 lg:mb-0 flex flex-col">
          <h1 className="mb-2 md:mb-4 lg:mb-8 uppercase text-black font-semibold">
            SHOP
          </h1>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"#"}
          >
            Women
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"#"}
          >
            Men
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"#"}
          >
            Jacket
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"#"}
          >
            Leggings
          </Link>
        </div>
        <div className="fifthColumn text-[#575757] basis-[15%] flex flex-col lg:mb-0 mb-2">
          <h1 className="mb-2 md:mb-4 lg:mb-8 uppercase text-black font-semibold">
            Help
          </h1>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/terms-conditions"}
          >
            Terms and Conditions
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/contact"}
          >
            Contact
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/login"}
          >
            Login
          </Link>
          <Link
            className="text-[#575757] hover:text-[#942] hover:font-semibold mb-2"
            href={"/regirster"}
          >
            Register
          </Link>
        </div>
      </div>
      <Separator className="mt-4" />
      <div className="flex lg:flex-row flex-col justify-between items-center w-[100%] mx-auto mt-4">
        <span className=" text-[#575757] hover:text-[#942]">
          @Copyright {currentDate} | All Right Reserved
        </span>
        <span className="text-[#575757] hover:text-[#942]">
          Designed By{" "}
          <span className="text-red text-md font-semibold cursor-pointer hover:text-[red]">
            Nepal Media Network
          </span>
        </span>
      </div>
    </div>
  );
}
export default Footer;
