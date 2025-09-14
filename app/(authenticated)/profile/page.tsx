"use client";
import { AxiosInstance } from "@/app/(repositories)/config";
import { GlobalContext } from "@/app/context/GLobalContext";
import { LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import noOrder from "../../../public/no-order.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const { currentUser } = useContext(GlobalContext);
  const id = currentUser?.user?._id;
  const [currentState, setCurrentState] = useState("my-profile");
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await AxiosInstance.get(`/orders?user=${id}`);
        setOrders(res?.data.data.results);
      } catch (error: any) {
        console.log(error);
      }
    };
    id && fetchOrders();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };

  if (!currentUser) {
    return (
      <div className="text-center flex items-center justify-center min-h-[50vh] ">
        <div className=" space-y-2 ">
          <Link href={"/login"}>
            <Button>Login</Button>
          </Link>
          <p className=" text-xs md:text-base"> Please,register befor making order. </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-8   pt-24 w-full md:w-11/12 mx-auto min-h-[100vh]">
      <div className=" border w-full lg:w-3/12 ">
        {lists.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => setCurrentState(item.value)}
            className={`${currentState === item.value ? " bg-primary-700  text-primary-50" : ""} cursor-pointer`}>
            <p className=" p-3">{item.name}</p>
            <hr />
          </div>
        ))}

        <div
          onClick={handleLogout}
          className=" hover:bg-primary-700 hover:text-primary-50  ">
          <p className=" p-3 flex items-center gap-2 cursor-pointer ">
            {" "}
            <LogOut size={18} /> Logout{" "}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-9/12">
        {currentState === "my-profile" && <Dashboard currentUser={currentUser} />}

        {currentState === "orders" && (
          <Orders
            currentUser={currentUser}
            orders={orders}
          />
        )}
        {/* {currentState === "track-you-order" && <Track />} */}
      </div>
    </div>
  );
}

const lists = [
  {
    name: "My Profile",
    value: "my-profile",
  },

  {
    name: "Orders",
    value: "orders",
  },

  // {
  //   name: "Track Your Order",
  //   value: "track-you-order",
  // },

  // {
  //   name: "My Address",
  //   value: "my-address",
  // },

  // {
  //   name: "Account Detail",
  //   value: "account-detail",
  // },
];

const Dashboard = ({ currentUser }: any) => {
  return (
    <div className=" border rounded-md">
      {currentUser && (
        <div className="bg-white  shadow overflow-hidden sm:rounded-lg w-full">
          <div className="px-4 py-5 sm:px-6 bg-gray-100 border-b ">
            <h3 className="text-lg leading-6 font-medium text-gray-600 ">Hello {currentUser?.fullName} ! </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about about user.</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser?.fullName}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser?.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{currentUser?.phone}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

const Orders = ({ currentUser, orders }: any) => {
  console.log(orders);

  return (
    <>
      {orders?.length === 0 && (
        <Image
          src={noOrder}
          alt="no order"
          className="h-52 w-52 mx-auto"
        />
      )}

      {currentUser &&
        orders &&
        orders.map((order: any, index: number) => {
          const totalAmount = order.items.reduce(
            (total: number, item: any) => total + item.qty * item.rate,
            0
          );

          return (
            <div
              key={index}
              className="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
            >
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    My Orders
                  </h3>

                  {order.status === "pending" && (
                    <span className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      <span className="w-2 h-2 me-1 bg-blue-500 rounded-full"></span>
                      Pending
                    </span>
                  )}

                  {order.status === "dispatched" && (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                      <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                      Dispatched
                    </span>
                  )}

                  {order.status === "delivered" && (
                    <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                      <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                      Delivered
                    </span>
                  )}

                  {order.status === "cancelled" && (
                    <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                      Cancelled
                    </span>
                  )}
                </div>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details about the orders.
                </p>
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 grid grid-cols-4 sm:gap-4 sm:px-6 text-primary-700/75 text-sm font-medium">
                    <dt>Product Name</dt>
                    <dd>Qty</dd>
                    <dd>Amount (Rs)</dd>
                    <dd className=" text-right">Total (Rs)</dd>
                  </div>

                  {order?.items.map((item: any, itemIndex: number) => (
                    <div
                      key={itemIndex}
                      className="bg-white border border-gray-50 px-4 py-5 grid grid-cols-4 sm:gap-4 sm:px-6 text-sm text-primary-700/85"
                    >
                      <dd>{item.product.name}</dd>
                      <dd>{item.qty}</dd>
                      <dd>Rs. {item.rate.toLocaleString("en-IN")}</dd>
                      {/* <dd className=" text-right">Rs. {item.qty * item.rate}.toLocaleString("en-IN")</dd> */}
                      <dd className="text-right">Rs. {(item.qty * item.rate).toLocaleString("en-IN")}</dd>

                    </div>
                  ))}

                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm text-gray-500 font-bold">Total Amount</dt>
                    <dt className="text-sm font-medium text-gray-500"></dt>
                    <dd className="mt-1 text-sm sm:mt-0 text-right font-bold">Rs. {totalAmount.toLocaleString("en-IN")}</dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
    </>
  );
};





