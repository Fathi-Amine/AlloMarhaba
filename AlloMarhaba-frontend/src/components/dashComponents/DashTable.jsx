import React , {useEffect, useState}from "react";
import DashboardModal from "./DashModal";
import { useShowMenusQuery, useShowMenuMutation } from "../../slices/menusApiSlice";
import Loader from "../Loader";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';


export default function DashboardTable() {
    const { data: menuData, error, isLoading, isError, isSuccess } = useShowMenusQuery();
    const [getMenuItem] = useShowMenuMutation();
    const [mydata, setMyData] = useState([]);
    const [editingMenuId, setEditingMenuId] = useState(null); // Nouvel état pour l'ID du menu en cours d'édition
    const [openModal , setOpenmodal] = useState(false)
    const [modeModal , setModeModal] = useState("")
    const[itemmenu , setItemMenu] = useState(null)

    
    useEffect(() => {
      if (menuData && menuData.menu) {
        setMyData(menuData);
      }
    }, [menuData]);
   

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleClose = ()=>{
    setOpenmodal(false)
  }

  const handleOpen = async (menuId,mode)=>{
    setEditingMenuId(menuId);
    setOpenmodal(true)
    setModeModal(mode)

    if(menuId != null){
      console.log(menuId);
       try {
      const resData = await getMenuItem({ id: menuId }).unwrap();
      console.log(resData.menu);
      setItemMenu(resData.menu)
      // Faire quelque chose avec resData, par exemple, le stocker dans un état
    } catch (error) {
      // Gérer les erreurs ici, par exemple, les imprimer ou les traiter d'une autre manière
      console.error('Une erreur s\'est produite lors de la récupération des données du menu :', error);
    }
    }

  }
  const handleMode =()=>{
    setModeModal(true)

}

  // const handleEdit = (menuId) => {
  //    // Mettez à jour l'ID du menu en cours d'édition
  //   seteditmodal(true);
  // };

  return (
    <div>
      {/* modal */}
      {/* modal */}
      <div className="p-4 sm:ml-64 bg-[#ddeff0]">
            <div className="p-4  border-gray-200  rounded-lg dark:border-gray-700 mt-14">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                </p>
            </div>
            <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <p class="text-2xl text-gray-400 dark:text-gray-500">
                <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                </p>
            </div>
        </div>

          <div className=" mt-20 mb-4">
             {/* modal */}
             <DashboardModal
      handleOpenModal={handleOpen}       
      handleModeModal = {handleMode}
      isOpen={openModal} // Passez l'ID du menu en cours d'édition comme prop
      modeModal={modeModal}
      closeModal={handleClose}
      itemMenu={itemmenu}
    />
      {/* modal */}
            </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Menu name
                      <a href="#">
                        {/* Your SVG icon */}
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Restaurant
                      <a href="#">
                        {/* Your SVG icon */}
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">
                      Price
                      <a href="#">
                        {/* Your SVG icon */}
                      </a>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
              {mydata && mydata.menu  ? (
                    mydata.menu.map((menu) => (
                        <tr
                        key={menu._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                        <td className="px-6 py-4">
                            {/* Display your image here */}
                            <img
                            src={menu.image}
                            alt="Menu Item"
                            style={{ maxWidth: '50px', maxHeight: '50px' }}
                            />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {menu.name}
                        </td>
                        <td className="px-6 py-4">{menu.restaurant_id.join(', ')}</td>
                        <td className="px-6 py-4">{menu.price}</td>
                        <td className="px-6 py-4 text-right">
                        <Button
        type="button"
        onClick={() => handleOpen(menu._id , 'edit')} // Passez l'ID du menu à la fonction handleEdit
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
      >
        Edit
      </Button>
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                        No menu data available.
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
