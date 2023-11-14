import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import store from "./Store.js";
import {Provider} from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import VerificationPage from "./pages/VerificationPage.jsx";
import UserListPage from "./pages/AllUsersPage.jsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/mail/verify-email" element={<VerificationPage />}></Route>
            <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
            <Route path="/user/reset-password/:token/:email" element={<ResetPasswordPage />}>
            </Route>
            <Route path="" element={<PrivateRoute />}>
                <Route path="/users" element={<UserListPage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
            </Route>
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>,
    </Provider>
)
