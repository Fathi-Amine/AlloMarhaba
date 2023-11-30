/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from "react-redux";
import { updateCartItems, removeFromCart } from "../slices/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/line__.css";
import { Link } from "react-router-dom";

function ShoppingCart({ hideCart }) {
    // Assuming your cart state is stored in Redux
    const { cartItems, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

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
            <div className="bg-slate-100 h-screen z-10  flex flex-col justify-between pb-5  ">
                <div>
                    <div className="flex justify-between p-8 shadow-gray-500 shadow-sm">
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
                    <div className="flex flex-col justify-between">
                        <div>
                            {cartItems.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <div>
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="mt-4">
                                            <div className="flex justify-between items-center px-3">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-20 w-20"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-3 w-2/5">
                                                    <p
                                                        className="text-lg
                                                    font-semibold font-sans 
                                                    "
                                                    >
                                                        {item.name}
                                                    </p>
                                                    <p>
                                                        {" "}
                                                        <span className="text-xs">
                                                            Price is:{" "}
                                                        </span>{" "}
                                                        {item.price}
                                                    </p>
                                                    <div className="flex">
                                                        <div
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                            }}
                                                            className=" text-gray-600 border border-gray-500 flex justify-center items-center hover:bg-red-500 hover:cursor-pointer hover:text-white hover:border-black"
                                                            onClick={() => {
                                                                addQuantity(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            +
                                                        </div>
                                                        <p
                                                            style={{
                                                                width: "37.78px",
                                                                height: "29.77px",
                                                            }}
                                                            className=" text-gray-600 border border-gray-500 flex justify-center items-center"
                                                        >
                                                            {item.quantity}
                                                        </p>
                                                        <div
                                                            style={{
                                                                width: "30px",
                                                                height: "30px",
                                                            }}
                                                            className=" text-gray-600 border border-gray-500 flex justify-center items-center hover:bg-red-500 hover:cursor-pointer hover:text-white hover:border-black"
                                                            onClick={() => {
                                                                reduceQuantity(
                                                                    item
                                                                );
                                                            }}
                                                        >
                                                            -
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        className="rounded-full bg-gray-300 shadow-md"
                                                        onClick={() => {
                                                            dispatch(
                                                                removeFromCart(
                                                                    item._id
                                                                )
                                                            );
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full px-6">
                    <div className="flex justify-between mb-3">
                        {" "}
                        <span>total price:</span>
                        <span className="text-red-500 font-bold">
                            $ {totalPrice}{" "}
                        </span>{" "}
                    </div>
                    <div className="px-6 w-full">
                        <Link
                            to="/checkout"
                            className={
                                cartItems.length === 0
                                    ? "bg-red-800 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed w-full flex justify-center"
                                    : "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded  w-full flex justify-center"
                            }
                            disabled={cartItems.length === 0}
                        >
                            <span>Checkout</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
