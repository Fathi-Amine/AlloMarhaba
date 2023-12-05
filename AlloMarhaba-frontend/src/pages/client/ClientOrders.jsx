import React, { useEffect, useState } from "react";
import { useGetClientOrdersQuery } from "../../slices/menusApiSlice";
import { CircularProgress } from "@mui/material";
import TrackOrder from "./TrackOrder";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderStatus, setOrderId } from "../../slices/orderSlice";
import { selectOrderStatus, selectOrderId } from "../../slices/orderSlice";

import { useSelector } from "react-redux";

export default function ClientOrders() {
  const dispatch = useDispatch();
  const {
    data: clientOrders,
    isLoading,
    isError,
    isSuccess,
  } = useGetClientOrdersQuery();

  const orderId = useSelector(selectOrderId);
  const orderStatus = useSelector(selectOrderStatus);

  const socket = io("http://localhost:5000", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000, // 1
  });

  useEffect(() => {
    socket.on("orderStatusChanged", (updatedOrder) => {
      console.log(updatedOrder);
      dispatch(setOrderStatus(updatedOrder.ordersData.status));
      dispatch(setOrderId(updatedOrder.ordersData._id));
    });

    return () => {
      socket.off("orderStatusChanged");
    };
  }, [dispatch]);

  console.log(clientOrders);
  // if (isLoading) {
  //   return <CircularProgress />;
  // }

  // if (isError) {
  //   return <div>Error loading orders</div>;
  // }

  return (
    <div>
      <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-3xl dark:text--gray-900 lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
            Your Order{" "}
          </h1>
          {/* <p className="text-base dark:text-gray-900 font-medium leading-6 text-gray-600">
            date : frida
          </p> */}
        </div>
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
  <div className=" dark:bg-gray-800 shadow-md rounded-md p-6 md:p-8 xl:p-10 w-full">
    <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
      Customer’s Orders
    </p>
    {isSuccess && clientOrders ? (
      clientOrders.data.map((order) => (
        <div
          key={order._id}
          className="mt-4 md:mt-6 bg-white dark:bg-gray-700 rounded-md overflow-hidden shadow-md w-full"
        >
          <div className="md:flex p-4 md:p-6 xl:p-8 space-y-4 md:space-y-0">
            <div className="md:w-40">
            <h1 className="text-lg md:text-xl font-semibold leading-6 text-gray-800">
                    Order Details : 
                  </h1>
              <img
                className="w-full hidden md:block"
                src="https://cdn5.vectorstock.com/i/1000x1000/88/84/complete-order-icon-in-filled-line-style-for-any-vector-35318884.jpg"
                alt="order icon"
              />
              <img
                className="w-full md:hidden"
                src="https://i.ibb.co/L039qbN/Rectangle-10.png"
                alt="order icon"
              />
            </div>
            <div className="flex-1 border-b border-gray-200 md:flex-row flex-col flex justify-between items-start pb-8 space-y-4 md:space-y-0">
              <div className="w-full md:w-1/2 flex flex-col justify-start items-start space-y-4">
                <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                  Order #
                </h3>
                <div>
                 
                  {order.menus.length > 0 &&
                    order.menus.map((menuItem, index) => (
                      <div
                        key={index}
                        className="flex flex-col justify-start items-start space-y-2"
                      >
                        {menuItem._id ? (
                          <>
                            <p className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                              Menu Name: {menuItem._id.name}
                            </p>
                            <p className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                              Quantity: {menuItem.quantity}
                            </p>
                            {/* Display other menu details like image, price, etc. */}
                          </>
                        ) : (
                          <p className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                            Menu information not available
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 flex items-center">
                <div className="flex flex-col justify-start items-start space-y-4">
                  <p className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                    Status:{" "}
                    {order._id === orderId ? orderStatus : order.status}
                  </p>
                  <p className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">
                    Total Price: ${order.total_price}
                  </p>
                  {/* Display other order details like items, prices, etc. */}
                  <Link to={`/track-order/${order._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      Track Order
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>
        <p className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
          {clientOrders && clientOrders.message}
        </p>
      </div>
    )}
  </div>
</div>



          <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div class="flex flex-col justify-start items-start flex-shrink-0">
                <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      David Kent
                    </p>
                    <p class="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p class="cursor-pointer text-sm leading-5 ">
                    david89@gmail.com
                  </p>
                </div>
              </div>
              <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Shipping Address
                    </p>
                    <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                  <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address
                    </p>
                    <p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                </div>
                <div class="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
