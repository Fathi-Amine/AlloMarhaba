import React from "react";
import { useDispatch } from "react-redux";
import { useAddMenuMutation } from "../../slices/menusApiSlice";
import { setMenus } from "../../slices/menuSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function DashboardModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit,formState: { errors } } = useForm();

  const [addMenu] = useAddMenuMutation();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const resData = await addMenu(data).unwrap();
      dispatch(setMenus(resData));
      navigate("/dash");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;
  //   const newValue = type === "file" ? files[0] : value;
  //   setValue(name, newValue);
  // };

  return (
    <div>
      <div id="crud-modal" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Menu
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 md:p-5"
              encType="multipart/form-data"
            >
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    {...register("name", { required: "name is required" })}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Menu name"
                  />
                   <span className="text-red-500 text-sm">{errors.name?.message}</span>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    {...register("image", { required: "image is required" })}
                    type="file"
                    name="image"
                    id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                  />
                   <span className="text-red-500 text-sm">{errors.image?.message}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    {...register("price", { required: "price is required" })}
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                  />
                   <span className="text-red-500 text-sm">{errors.price?.message}</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="restaurant"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cuizine
                  </label>
                  <select
                    {...register("restaurant", { required: "restaurant is required"  })}
                    id="restaurant"
                    name="restaurant"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="">Select Cuisine</option>
                    <option value="TV/Monitors">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="Gaming/Console">Gaming/Console</option>
                    <option value="Phones">Phones</option>
                  </select>
                  <span className="text-red-500 text-sm">{errors.restaurant?.message}</span>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add new Menu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
