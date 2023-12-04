import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useAddMenuMutation,
  useUpdateMenuMutation,
} from "../../slices/menusApiSlice";
import { setMenus } from "../../slices/menuSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetRestaurantsQuery } from "../../slices/menusApiSlice";
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
} from "@mui/material";

export default function DashboardModal({
  handleOpenModal,
  handleModeModal,
  isOpen,
  modeModal,
  closeModal,
  itemMenu,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [addMenu] = useAddMenuMutation();
  const [updateMenu] = useUpdateMenuMutation();
  const {
    data: myRestaurant,
    isLoading,
    isError,
    isSuccess,
  } = useGetRestaurantsQuery();
  console.log("hghhg");
  console.log(myRestaurant);

  // const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState(null); 
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const singleRestaurantArray = [myRestaurant.data]; 
      setRestaurants(singleRestaurantArray);
    }
  }, [isSuccess, myRestaurant]);

  useEffect(() => {
    console.log(itemMenu);
    setId(modeModal === "edit" ? itemMenu?._id : "");
    setName(modeModal === "edit" ? itemMenu?.name : "");
    setPrice(modeModal === "edit" ? itemMenu?.price : "");
    setRestaurant(modeModal === "edit" ? itemMenu?.restaurant_id : "");
  }, [modeModal, itemMenu]);

  const handleImageChange = (e) => {
    
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpdate = async () => {
    try {
      console.log(image);
      if (image) {
     
        const compressedImage = await imageCompression(image, {
          maxSizeMB: 0.05,
          useWebWorker: true, 
        });

        
        const base64Image = await convertToBase64(compressedImage);

        const resData = await updateMenu({
          id: id,
          name: name,
          image: base64Image,
          price: price,
          restaurant_id: restaurant,
        }).unwrap();
        console.log(resData.message);
        if (resData.message) {
          toast.success(resData.message, {
            position: toast.POSITION.TOP_RIGHT, 
            style: {
              marginTop: "4rem",
              background: "#007bff", 
              color: "#fff", 
              borderRadius: "10px", 
              padding: "15px 25px", 
              fontSize: "18px", 
              textAlign: "center", 
            },
          });
        }

        dispatch(setMenus(resData));
        closeModal();
      } else {
        const resData = await updateMenu({
          id: id,
          name: name,
          price: price,
          restaurant_id: restaurant,
        }).unwrap();
        console.log(resData.message);
        if (resData.message) {
          toast.success(resData.message, {
            position: toast.POSITION.TOP_RIGHT, 
            style: {
              marginTop: "4rem",
              background: "#007bff", 
              color: "#fff", 
              borderRadius: "10px", 
              padding: "15px 25px", 
              fontSize: "18px", 
              textAlign: "center", 
            },
          });
        }

        dispatch(setMenus(resData));
        closeModal();
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        toast.success(error.response.message, {
          position: toast.POSITION.TOP_RIGHT, 
          style: {
            marginTop: "4rem",
            background: "#007bff", 
            color: "#fff",
            borderRadius: "10px", 
            padding: "15px 25px", 
            fontSize: "18px", 
            textAlign: "center",
          },
        });
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      if (data.image && data.image[0] instanceof File) {
        const compressedImage = await imageCompression(data.image[0], {
          maxSizeMB: 0.05, 
          useWebWorker: true, 
        });

        const base64Image = await convertToBase64(compressedImage);
          console.log('id for restaurant' , restaurant);
        const resData = await addMenu({
          name: data.name,
          image: base64Image,
          price: data.price,
          restaurant_id: restaurant,
        }).unwrap();
        console.log(resData.message);
        if (resData.message) {
          toast.success(resData.message, {
            position: toast.POSITION.TOP_RIGHT, 
            style: {
              marginTop: "4rem",
              background: "#007bff", 
              color: "#fff", 
              borderRadius: "10px",
              padding: "15px 25px", 
              fontSize: "18px", 
              textAlign: "center", 
            },
          });
        }

        dispatch(setMenus(resData));
        closeModal();
      } else {
        console.error("Le fichier sélectionné n'est pas une image valide.");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        toast.success(error.response.message, {
          position: toast.POSITION.TOP_RIGHT, 
          style: {
            marginTop: "4rem",
            background: "#007bff", 
            color: "#fff", 
            borderRadius: "10px", 
            padding: "15px 25px", 
            fontSize: "18px", 
            textAlign: "center",
          },
        });
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => handleOpenModal(null, "add")}
      >
        Ouvrir le modal
      </Button>
      <Dialog open={isOpen} onClose={isOpen}>
        <DialogTitle>
          {modeModal === "edit" ? "Modifier le menu" : "Ajouter un menu"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="grid gap-4 mb-4 grid-cols-2">
              {modeModal === "edit" && (
                <div className="col-span-2">
                  <label htmlFor="name">Image</label>
                  <img
                    src={itemMenu?.image}
                    alt=""
                    style={{ width: "400px", height: "400px" }}
                  />
                </div>
              )}
              <div className="col-span-2">
                <label htmlFor="name">Name</label>
                <input
                  {...register(
                    "name",
                    modeModal !== "edit" && {
                      required: "Ce champ name est requis",
                    }
                  )}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {modeModal !== "edit" ? (
                  <span className="text-red-500 text-sm">
                    {errors.name?.message}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2">
                <label htmlFor="image">Image</label>
                <input
                  {...register(
                    "image",
                    modeModal !== "edit" && {
                      required: "Ce champ name est requis",
                    }
                  )}
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="$2999"
                />
                {modeModal !== "edit" ? (
                  <span className="text-red-500 text-sm">
                    {errors.image?.message}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="price">Price</label>
                <input
                  {...register(
                    "price",
                    modeModal !== "edit" && {
                      required: "Ce champ name est requis",
                    }
                  )}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
                {modeModal !== "edit" ? (
                  <span className="text-red-500 text-sm">
                    {errors.price?.message}
                  </span>
                ) : null}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="restaurant">Restaurant</label>
                <Select
                  {...register(
                    "restaurant_id",
                    modeModal !== "edit" && {
                      required: "Ce champ name est requis",
                    }
                  )}
                  fullWidth
                  margin="normal"
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                >
                  <MenuItem value="">Select Restaurant</MenuItem>
                  {restaurants.map((restaurant) => (
                    <MenuItem key={restaurant._id} value={restaurant._id}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </Select>
                {modeModal !== "edit" && (
                  <span className="text-red-500 text-sm">
                    {errors.restaurant_id?.message}
                  </span>
                )}
              </div>
            </div>
            <DialogActions>
              <Button onClick={closeModal} color="primary">
                Annuler
              </Button>
              {modeModal === "edit" ? (
                <Button onClick={handleUpdate} color="primary">
                  Modifier
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  Ajouter
                </Button>
              )}
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
