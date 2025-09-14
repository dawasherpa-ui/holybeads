// "use client";
import Footer from "@/components/website/footer";
import Navbar from "@/components/website/navbar";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    
    <div className="">
      {/* <Suspense> */}
        <div className=" fixed w-full bg-white shadow-sm border-b z-40  flex justify-center px-4 md:px-0">
          <div className=" w-full md:w-11/12  mx-auto ">
            <Navbar />
          </div>
        </div>
        {/* <div className=""> */}
          {/* <div className="w-full md:w-11/12 mx-auto  overflow-x-hidden pt-16"> */}
          {/* <div className=" px-4 md:px-0 mt-10">{children}</div> */}
          <div className="min-h-screen">{children}</div>
        {/* </div> */}
      {/* </Suspense> */}
      <div className=" bg-[#eee]  rounded-t-md">
        <div className="  w-10/12 md:w-11/12  mx-auto ">
          <Footer />
        </div>
      </div>
    </div>
  );
}
