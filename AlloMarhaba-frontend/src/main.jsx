import AuthorizedRoute from "./components/AuthorizedRoute.jsx";

import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import store from "./Store.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import UserListPage from "./pages/AllUsersPage.jsx";
import DashboardNavbar from "./pages/dash/dashboard.jsx";
import FillRestaurant from "./pages/manager/FillRestaurant.jsx";
import Products from "./pages/client/Products.jsx";
import Checkout from "./pages/client/Checkout.jsx";
import Restaurant from "./components/Restaurants/index.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route
                path="/dash"
                element={
                    <AuthorizedRoute
                        requiredRole="manager"
                        element={<DashboardNavbar />}
                    />
                }
            ></Route>
            <Route path="/" element={<App />}>
                <Route index={true} path="/" element={<Home />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route
                    path="/mail/verify-email"
                    element={<VerificationPage />}
                ></Route>
                <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
                <Route
                    path="/user/reset-password/:token/:email"
                    element={<ResetPasswordPage />}
                ></Route>
                <Route path="" element={<PrivateRoute />}>
                    {/* <Route path="/dash" element={<DashboardNavbar />}></Route> */}
                    <Route path="/users" element={<UserListPage />}></Route>
                    <Route path="/profile" element={<ProfilePage />}></Route>
                    <Route
                        path="/manager/fill-restaurant"
                        element={<FillRestaurant />}
                    ></Route>
                    <Route
                        path="/:restaurantName/products"
                        element={<Products />}
                    ></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/restaurants" element={<Restaurant />}></Route>
                </Route>
            </Route>
        </Route>
    )
);
ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <RouterProvider router={router} />
        {/* </React.StrictMode>, */}
    </Provider>
);
