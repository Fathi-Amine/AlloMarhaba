import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import "../assets/line__.css";

function ShoppingCart({ hideCart }) {
    // Assuming your cart state is stored in Redux
    const { cartItems } = useSelector((state) => state.cart);

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
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <div>
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    {/* Add more details about the item */}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default ShoppingCart;
