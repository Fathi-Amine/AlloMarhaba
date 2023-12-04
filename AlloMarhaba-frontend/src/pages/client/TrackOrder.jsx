import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectOrderStatus, selectOrderId } from '../../slices/orderSlice';




import {
  Button,
  CircularProgress,
  LinearProgress
} from '@mui/material';


export default function TrackOrder() {
  const orderStatus = useSelector(selectOrderStatus);
  const orderIdFromRedux = useSelector(selectOrderId);
  const { orderId: routeOrderId } = useParams();
  const [localOrderStatus, setLocalOrderStatus] = useState("");
  

  useEffect(() => {
    // Comparer avec l'orderId stocké dans le Redux
    if (orderIdFromRedux === routeOrderId) {
      setLocalOrderStatus(orderStatus)

    }
  }, [orderIdFromRedux, routeOrderId, orderStatus]);
    


  return (
    <div>
      <p className="text-gray-900">Status: {localOrderStatus}</p>

      <section className="box-border py-8 leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24">
        <div className="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4">
          <div className="flex flex-col items-center leading-7 text-center text-gray-900">
            <h2 className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl">
              Track Your Orders
            </h2>
            <p className="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid">
              Stay updated with the status of your orders
            </p>
          </div>
          <div className="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4  border-gray-300 border-blue-600 rounded-xl md:max-w-lg lg:max-w-none lg:grid-cols-4">
            <div className={`box-border px-4 py-8 mb-6 text-center ${localOrderStatus === "pending" || localOrderStatus === "preparation" || localOrderStatus === "prepared" || localOrderStatus === "delivered"    ? "bg-lime-500" : ""} border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10`}>
            {localOrderStatus !== "pending" &&  localOrderStatus !== "preparation" && localOrderStatus !== "prepared" && localOrderStatus !== "delivered"  && <LinearProgress color="inherit" />}

              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Pending
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                Your order is pending processing
              </p>
              <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded-md cursor-pointer sm:text-base sm:mt-8 md:text-lg">
                Track Order
              </button>
            </div>
            <div className={`box-border px-4 py-8 mb-6 text-center border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10 ${localOrderStatus === "preparation" || localOrderStatus === "prepared" || localOrderStatus === "delivered"  ? "bg-lime-500" : ""}`}>
              {localOrderStatus !== "preparation" && localOrderStatus !== "prepared" && localOrderStatus !== "delivered"  && <LinearProgress color="inherit" />}
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Preparation
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                Your order is being prepared
              </p>
              <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded-md cursor-pointer sm:text-base sm:mt-8 md:text-lg">
                Track Order
              </button>
            </div>
            <div className={`box-border px-4 py-8 mb-6 text-center border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10 ${localOrderStatus === "prepared" || localOrderStatus === "delivered"  ? "bg-lime-500" : ""}`}>
              {localOrderStatus !== "prepared" && localOrderStatus !== "delivered"  && <LinearProgress color="inherit" />}
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Prepared
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                Your order is being prepared
              </p>
              <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded-md cursor-pointer sm:text-base sm:mt-8 md:text-lg">
                Track Order
              </button>
            </div>
            <div className={`box-border px-4 py-8 mb-6 text-center border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10 ${localOrderStatus === "delivered" ? "bg-lime-500" : ""}`}>
              {localOrderStatus !== "delivered" && <LinearProgress color="inherit" />}
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
               Delivered
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                Your order has been delivered
              </p>
              <button className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-blue-600 no-underline bg-transparent border border-b-2 border-blue-600 rounded-md cursor-pointer sm:text-base sm:mt-8 md:text-lg">
                Track Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}