/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateCartItems, removeFromCart } from "../slices/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/line__.css";
import { Link } from "react-router-dom";

function ShoppingCart({ hideCart }) {
    // Assuming your cart state is stored in Redux
    const { cartItems } = useSelector((state) => state.cart);
    const [position, setPosition] = useState([0, 0]);
    const dispatch = useDispatch();

    useEffect(() => {
        // Utiliser la fonction de géolocalisation du navigateur
        navigator.geolocation.getCurrentPosition(
            (geoLocation) => {
                const { latitude, longitude } = geoLocation.coords;
                setPosition([latitude, longitude]);
            },
            (error) => {
                console.error(error.message);
            }
        );
    }, []);

    const addQuantity = (item) => {
        const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
        };
        const itemIndex = cartItems.findIndex(
            (cartItem) => cartItem._id === item._id
        );
        const updatedCartItems = [
            ...cartItems.slice(0, itemIndex),
            updatedItem,
            ...cartItems.slice(itemIndex + 1),
        ];
        dispatch(updateCartItems(updatedCartItems));
    };

    const reduceQuantity = (item) => {
        if (item.quantity === 1) {
            console.log("removed to cart because quantity is 1");
            dispatch(removeFromCart(item._id));
            return;
        }
        const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
        };
        const itemIndex = cartItems.findIndex(
            (cartItem) => cartItem._id === item._id
        );
        const updatedCartItems = [
            ...cartItems.slice(0, itemIndex),
            updatedItem,
            ...cartItems.slice(itemIndex + 1),
        ];
        dispatch(updateCartItems(updatedCartItems));
    };

    return (
        <div className="absolute w-full h-full z-10">
            <div className="bg-yellow-300 h-screen z-10 ">
                <div className="flex justify-between p-10 shadow-gray-500 shadow-sm">
                    <div className="text-xl"> Shopping Cart</div>
                    <div
                        className="p-1 cursor-pointer hover:text-blue-400"
                        onClick={() => {
                            console.log("clicked");
                            hideCart(false);
                        }}
                    >
                        <CloseIcon />
                    </div>
                </div>
                <div>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>{item.price}</p>
                                        <p>{item.quantity}</p>
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                onClick={() => {
                                                    addQuantity(item);
                                                }}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="bg-blue-200 hover:bg-blue-4  00 text-white font-bold py-1 px-2 rounded"
                                                onClick={() => {
                                                    reduceQuantity(item);
                                                }}
                                            >
                                                -
                                            </button>
                                            <button
                                                className="bg-red-800"
                                                onClick={() => {
                                                    dispatch(
                                                        removeFromCart(item._id)
                                                    );
                                                }}
                                            >
                                                rmv
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <Link
                        to="/checkout"
                        className={
                            cartItems.length === 0
                                ? "bg-gray-900 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        }
                        disabled={cartItems.length === 0}
                    >
                        <span>Checkout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
