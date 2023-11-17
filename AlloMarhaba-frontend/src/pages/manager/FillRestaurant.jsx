import Axios from "axios";
import { useEffect } from "react";

function FillRestaurant() {
    useEffect(() => {
        const handleclick = () => {
            Axios.get("http://localhost:5000/api/manager/checkRestaurant", {
                withCredentials: true,
            }).then((response) => {
                console.log(response.data.status);
            });
        };

        handleclick();
    }, []);
    return (
        <div className="flex flex-col items-center mt-16">
            <h5 className="text-stone-700 text-2xl font-semibold text-center">
                Fill Info About Your Resraurant
            </h5>
            <div>
                <form className="mt-8  p-4 flex flex-col gap-2" action="">
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="name"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="phone number"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="country"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="state"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="city"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="Adress"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="longitude"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="latitude"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="cuisine type"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="image"
                            />
                        </div>
                    </div>
                </form>
                <button className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50">
                    checkckc
                </button>
            </div>
        </div>
    );
}

export default FillRestaurant;
