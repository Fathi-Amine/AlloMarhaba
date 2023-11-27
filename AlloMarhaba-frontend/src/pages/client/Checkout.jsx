import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function Checkout() {
    const [position, setPosition] = useState([0, 0]);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const { cartItems, totalPrice } = useSelector((state) => state.cart);

    const handleSubmit = () => {
        if (
            name === "" ||
            phone === "" ||
            address === "" ||
            postalCode === "" ||
            position[0] === 0 ||
            position[1] === 0 ||
            cartItems.length === 0
        ) {
            return alert("Please fill all the fields");
        }
        const data = {
            restaurantName: localStorage.getItem("restaurantName"),
            totalPrice: totalPrice,
            menus: cartItems,
            checkoutDetails: {
                name: name,
                phone: phone,
                address: address,
                postalCode: postalCode,
            },
            longitude: position[0],
            latitude: position[1],
        };
        console.log(data);
        axios
            .post("http://localhost:5000/api/client/orders", data, {
                withCredentials: true,
            })
            .then((res) => {
                console.log("it works");
                console.log(res);
            });
    };
    return (
        <div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="phone">Phone</label>
                        <input
                            onChange={(e) => setPhone(e.target.value)}
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Phone"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="address">Address</label>
                        <input
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Address"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="number"
                            onChange={(e) => setPostalCode(e.target.value)}
                            name="postalCode"
                            id="postalCode"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Postal Code"
                        />
                    </div>
                    <div className="">
                        <label htmlFor="loca">
                            Delivered to My localisation
                        </label>
                        <input
                            onChange={(e) => {
                                if (e.target.checked) {
                                    navigator.geolocation.getCurrentPosition(
                                        (geoLocation) => {
                                            const { latitude, longitude } =
                                                geoLocation.coords;
                                            setPosition([latitude, longitude]);
                                        },
                                        (error) => {
                                            console.error(error.message);
                                        }
                                    );
                                }
                            }}
                            type="checkbox"
                            name="loca"
                            id="loca"
                            className="border ring-blue-500  focus:outline-none "
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
