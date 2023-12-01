import React, { useState, useEffect } from "react";
import { useShowOrdersQuery , useUpdateOrderStatusMutation} from "../../slices/menusApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  CircularProgress

} from '@mui/material';


export default function DashboardOrderTable() {
  const [updatestatus] = useUpdateOrderStatusMutation();
  const { data: showOrder, refetch, error, isLoading, isError, isSuccess } =
    useShowOrdersQuery();

  const [selectedStatus, setSelectedStatus] = useState({});
  // console.log(showOrder);
  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus({
      ...selectedStatus,
      [orderId]: newStatus,
    });
    handlechangeOrderStatus(orderId,newStatus)
          
  };

  const handlechangeOrderStatus = async (orderId , Status)=>{

    try {
      const updateResult = await updatestatus({
        id : orderId,
        status: Status,
      }

      );
      console.log(updateResult.data.message);
      if (updateResult.data.message) {
        toast.success(updateResult.data.message, {
          position: toast.POSITION.TOP_RIGHT, // Position en haut à droite
          style: {
            marginTop: "4rem",
            background: "#007bff", // Couleur de fond bleue
            color: "#fff", // Couleur du texte blanc
            borderRadius: "10px", // Coins arrondis
            padding: "15px 25px", // Espacement interne
            fontSize: "18px", // Taille du texte
            textAlign: "center", // Centrer le texte horizontalement
          },
        });
      }

  
      console.log("Résultat de la mise à jour du statut :", updateResult);
  
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }


  }

  useEffect(() => {
    // If you want to perform any side effects when selectedStatus changes,
    // you can do it here
  }, [selectedStatus]);

  return (
    <div>
      <div className="p-4 sm:ml-64 bg-[#ddeff0]">
        <div className="p-4  border-gray-200  rounded-lg dark:border-gray-700 mt-14">
          <div className="mt-[7rem] relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Orders menu
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {isSuccess &&
                  showOrder.data.map((order) => (
                    <tr
                      key={order._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="px-6 py-4">
                        {order.user_id && order.user_id.username}
                      </td>
                      <td className="px-6 py-4">
                        {order.menus.map((menu) => (
                          <div key={menu._id}>
                            {/* Render menu details */}
                            {/* For example, menu.quantity, menu._id */}
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <select
                        name="status"
                          value={selectedStatus[order._id] || order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className="bg-white border rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="preparation">Preparation</option>
                          <option value="prepared">Prepared</option>
                          <option value="delivered">Delivered</option>


                          {/* Add other possible status values */}
                        </select>
                      </td>
                      <td className="px-6 py-4">{order.total_price}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleEdit(order._id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                {isLoading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                    <CircularProgress />
                    </td>
                  </tr>
                )}
                {isError && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      Error loading data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
