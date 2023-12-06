/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthorizedRoute = ({ element, requiredRole }) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [isLogged, setIsLogged] = useState(true);
    const { userInfo } = useSelector((state) => state.auth);
    console.log(userInfo);

    const checkAuthorization = () => {
        if (!userInfo) {
            setIsLogged(false);
            return;
        } else {
            if (userInfo.user.role === requiredRole) {
                console.log("authorized");
                setIsAuthorized(true);
            } else {
                console.log("not authorized");
                setIsAuthorized(false);
            }
        }
    };

    useEffect(() => {
        if (!userInfo) {
            setIsLogged(false);
            return;
        }

        checkAuthorization();
    }, [requiredRole, userInfo]);

    useEffect(() => {
        // Handle the case where userInfo is not present in localStorage
        if (!userInfo) {
            navigate("/login");
            return;
        }

        // Perform the authorization check
        checkAuthorization();

        if (!isLogged) {
            navigate("/login");
        } else if (isAuthorized === false) {
            navigate("/unauthorized");
        }
    }, [isAuthorized, isLogged, navigate, userInfo]);

    if (isAuthorized === true) {
        return element;
    } else {
        // Handle loading state (you can replace this with a loading spinner or message)
        return <div>Loading...</div>;
    }
};

export default AuthorizedRoute;
