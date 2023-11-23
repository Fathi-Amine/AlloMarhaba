import { useEffect, useState } from "react";

function Checkout() {
    const [position, setPosition] = useState([0, 0]);
    useEffect(() => {
        // Utiliser la fonction de géolocalisation du navigateur
        navigator.geolocation.getCurrentPosition(
            (geoLocation) => {
                const { latitude, longitude } = geoLocation.coords;
                console.log(latitude, longitude);
                setPosition([latitude, longitude]);
            },
            (error) => {
                console.error(error.message);
            }
        );
    }, []);
    return (
        <div>
            <div className="w-full flex flex-wrap gap-2 justify-center">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
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
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Postal Code"
                        />
                    </div>
                </div>

                <h1>Checkout</h1>
            </div>
        </div>
    );
}

export default Checkout;
