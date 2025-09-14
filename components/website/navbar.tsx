"use client";
import * as React from "react";
import Link from "next/link";
import logo from "../../public/logo.svg";
import Image from "next/image";
import { ShoppingCart, User, User2 } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { MenuIcon } from "lucide-react";
import { GlobalContext } from "@/app/context/GLobalContext";
import { Button } from "../ui/button";
import { AxiosInstance } from "@/app/(repositories)/config";
import { Separator } from "../ui/separator";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("category");

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { currentUser } = React.useContext(GlobalContext);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };

  // const [categories, setCategories] = React.useState<any>();
  // React.useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const res = await AxiosInstance.get("/categories");
  //       setCategories(res?.data?.data?.results);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetch();
  // }, []);

  return (
    <>
      <div className=" flex items-center justify-between py-2 lg:py-3 2xl:py-4">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="img"
            height={150}
            width={150}
            className=" object-cover  "
          />
        </Link>

        <div className=" hidden md:flex gap-4">
          <div className=" flex  items-center gap-8 font-medium">
            <Link
              href={"/"}
              className={`${
                pathname === "/"
                  ? " font-semibold border-b-2 border-[#942] underline-offset-4"
                  : ""
              }  `}
            >
              Home
            </Link>

            {/* {categories?.map((category: any, index: number) => (
              <Link
                href={`/category/${category.categoryId}`}
                className={`${catId === category.categoryId ? " font-semibold  border-b-2 border-[#942] underline-offset-4 " : ""}  `}
                key={index}>
                {category.name}
              </Link>
            ))} */}

            <Link
              href={"/shop"}
              className={`${
                pathname === "/shop"
                  ? " font-semibold   border-b-2 border-[#942] underline-offset-4 "
                  : ""
              }  `}
            >
              Shop
            </Link>

            <Link
              href={"/about"}
              className={`${
                pathname === "/about"
                  ? " font-semibold   border-b-2 border-[#942] underline-offset-4 "
                  : ""
              }  `}
            >
              About
            </Link>

            <Link
              href={"/offers"}
              className={`${
                pathname === "/offers"
                  ? " font-semibold   border-b-2 border-[#942] underline-offset-4 "
                  : ""
              }  `}
            >
              Offers
            </Link>
          </div>

          <div className=" hidden md:block">
            <div className=" flex items-center gap-4">
              {currentUser && (
                <Link
                  href={"/cart"}
                  className="rounded-full  p-2 text-primary-500 cursor-pointer220-"
                >
                  <ShoppingCart size={18} />
                </Link>
              )}

              {currentUser && (
                <Link
                  href={"/profile"}
                  className="rounded-full border border-neutral-300 bg-primary-50 p-2 text-primary-500 cursor-pointer hover:bg-primary-500 hover:text-neutral-50 hover:-translate-y-1 duration-300"
                >
                  <User size={18} />
                </Link>
              )}

              {!currentUser && (
                <>
                  <Link
                    href={"/login"}
                  >
                    <Button className="py-1 h-fit px-5 rounded-full items-center flex gap-1">
                      <User2 size={14} />
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className=" block md:hidden">
          <div className=" flex items-center gap-2 ">
            <MenuIcon
              onClick={toggleDrawer}
              size={26}
              className=" cursor-pointer block md:hidden "
            />

            <Drawer
              open={isOpen}
              onClose={toggleDrawer}
              direction="right"
              className="  bg-secondary-500 z-30 "
            >
              <div className=" bg-secondary-500 space-y-4 p-4 border-none flex flex-col h-screen">
                <Link
                  href={"/"}
                  className={`${
                    pathname === "/"
                      ? " text-teal-500 underline_hover_effect"
                      : ""
                  } text-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect `}
                >
                  Home
                </Link>

                {/* {categories?.map((category: any, index: number) => (
                  <Link
                    href={`/category/${category.categoryId}`}
                    className={`${catId === category.categoryId ? " ftext-teal-500 underline_hover_effect  " : ""}  text-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect `}
                    key={index}>
                    {category.name}
                  </Link>
                ))} */}

                <Link
                  href={"/shop"}
                  className={`${
                    pathname === "/shop"
                      ? " ftext-teal-500 underline_hover_effect  "
                      : ""
                  }  text-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect `}
                >
                  Shop
                </Link>

                <Link
                  href={"/about"}
                  className={`${
                    search === "about"
                      ? " text-teal-500 underline_hover_effect "
                      : ""
                  } text-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect`}
                >
                  About
                </Link>

                <Link
                  href={"/offers"}
                  className={`${
                    search === "offers"
                      ? " text-teal-500 underline_hover_effect "
                      : ""
                  } text-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect`}
                >
                  Offers
                </Link>

                <div className=" flex flex-col gap-2">
                  <Link
                    href={"/profile"}
                    className={`${
                      pathname === "/profile"
                        ? " text-teal-500 underline_hover_effect "
                        : ""
                    } ext-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect `}
                  >
                    Profile
                  </Link>

                  <Link
                    href={"/cart"}
                    className={`${
                      pathname === "/cart"
                        ? " text-teal-500 underline_hover_effect"
                        : ""
                    }  ext-accent-400 cursor-pointer hover:text-primary-500 transition-all ease-in-out  underline_hover_effect`}
                  >
                    Cart
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  {!currentUser && (
                    <>
                      {" "}
                      <Link href={"/login"}>Login</Link>
                      {/* <Separator orientation="vertical" className="bg-black" /> */}
                      <span className="text-xl ">/</span>
                      <Link href={"/register"}>Register</Link>
                    </>
                  )}

                  {currentUser && (
                    <Button type="button" onClick={handleLogout}>
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
}
