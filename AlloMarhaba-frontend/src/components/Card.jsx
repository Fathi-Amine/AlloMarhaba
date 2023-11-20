import "../assets/line__.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { useState } from "react";

function Card() {
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const handleButtonClick = () => {
        setIsButtonClicked(!isButtonClicked);
    };
    return (
        <>
            <div className="flex justify-center ">
                <div className="father-div w-64 h-96 border-2 transition border-transparent hover:border-red-600">
                    <div className="flex justify-center h-64 relative overflow-hidden">
                        <img
                            src="https://yummi-theme.myshopify.com/cdn/shop/products/shop-6.jpg?v=1589800162&width=360"
                            className="h-full"
                            alt=""
                        />
                        <div
                            className={`absolute p_under_icon ${
                                isButtonHovered ? "fff" : ""
                            }`}
                        >
                            {/* <span>Add to cart</span> */}
                            <span>
                                {isButtonClicked
                                    ? "Added to cart"
                                    : "Add to cart"}
                            </span>
                        </div>
                        <div className="absolute icon-father">
                            <button
                                // className="p-2 bg-red-600  hover:bg-yellow-400 button__"
                                className={`p-2 bg-red-600  hover:bg-yellow-400 ${
                                    isButtonClicked ? "button__" : ""
                                }`}
                                onMouseEnter={() => setIsButtonHovered(true)}
                                onMouseLeave={() => setIsButtonHovered(false)}
                                onClick={handleButtonClick}
                                style={{
                                    transition: "background-color 0.5s ease",
                                }}
                            >
                                {isButtonClicked ? (
                                    <LocalMallIcon sx={{ color: "white" }} />
                                ) : (
                                    <AddShoppingCartIcon
                                        sx={{ color: "white" }}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="h-full w-full relative">
                            {/* line with a square in the middle */}
                            <div className="mb-5 relative">
                                <div className="line__"></div>
                                <div className="square__"></div>
                            </div>

                            <div className="text-center tracking-wide">
                                Salisbury Steak
                            </div>
                            <div className="text-center mt-3">$555</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
