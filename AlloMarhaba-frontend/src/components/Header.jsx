import { Nav, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice.js";
import { clearCredentials } from "../slices/authSlice.js";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import Logo from "../assets/logolocation.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCart from "./ShoppingCart";
import { useState, useEffect } from "react";
import "../assets/line__.css";
import { addToCart } from "../slices/cartSlice";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const [showCart, setShowCart] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <header>

            <div
                className={`cart-container ${
                    showCart ? "cart-container-show" : ""
                }`}
            >
                {showCart && <ShoppingCart hideCart={setShowCart} />}
            </div>
            <div>
                <div className=" bg-yellow-400 py-1">
                    <div className="container mx-auto bg-yellow-400 py-2">
                        <div>
                            <div className="flex justify-between  ">
                                <div className="flex gap-2 items-center">
                                    <div>
                                        <LocalPhoneIcon
                                            style={{ fontSize: 20 }}
                                        />
                                    </div>
                                    <div>+121 636808359</div>
                                    <div>
                                        <EmailIcon style={{ fontSize: 20 }} />
                                    </div>
                                    <div>soufianeargane800@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white">
                    <div className="container">
                        <div className="flex justify-between items-center py-2 px-1">
                            <div
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    backgroundImage: "url(" + Logo + ")",
                                }}
                            ></div>
                            <div>
                                <ul>
                                    <li className="inline-block p-4">
                                        <Link className="font-2 text-lg" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="inline-block p-4">
                                        <Link
                                            className="font-2 text-lg"
                                            to="/about"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li className="inline-block p-4">
                                        <Link
                                            className="font-2 text-lg"
                                            to="/services"
                                        >
                                            Services
                                        </Link>
                                    </li>
                                    <li className="inline-block p-4">
                                        <Link
                                            className="font-2 text-lg"
                                            to="/contact"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex gap-2 items-center">
                                {/* cart */}
                                <div
                                    className="relative"
                                    onClick={() => setShowCart(!showCart)}
                                >
                                    <span
                                        className="absolute -top-1 -right-3 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
                                        style={{ fontSize: "10px" }}
                                    >
                                        {cartItems.length}
                                    </span>
                                    <AddShoppingCartIcon />
                                    {/* Show the ShoppingCart component based on the state */}
                                </div>

                                {/* nav */}
                                <div>
                                    <Nav className="ms-auto">
                                        {userInfo ? (
                                            <>
                                                <NavDropdown id="username">
                                                    <LinkContainer to="/profile">
                                                        <NavDropdown.Item>
                                                            Profile
                                                        </NavDropdown.Item>
                                                    </LinkContainer>

                                                    <NavDropdown.Item
                                                        onClick={logoutHandler}
                                                    >
                                                        Logout
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                        ) : (
                                            <>
                                                <LinkContainer to="/login">
                                                    <Nav.Link>
                                                        <FaSignInAlt /> Sign In
                                                    </Nav.Link>
                                                </LinkContainer>
                                                <LinkContainer to="/register">
                                                    <Nav.Link>
                                                        <FaSignOutAlt />{" "}
                                                        Register
                                                    </Nav.Link>
                                                </LinkContainer>
                                            </>
                                        )}
                                    </Nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
