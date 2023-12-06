import Axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeafletClick from "../../components/LeafletClick.jsx";
import logo from "../../assets/logolocation.png";
import CountrySelector from "../../components/CountrySelector.jsx";
import CitySelector from "../../components/CitySelector.jsx";

import { useSelector } from "react-redux";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FillRestaurant() {
    const { lat, lng } = useSelector((state) => state.map);

    const [chosenCountry, setChosenCountry] = useState("");
    const [chosenCity, setChosenCity] = useState("");
    const [chosenAdress, setChosenAdress] = useState("");
    const [chosenCuisine, setChosenCuisine] = useState("");
    const [chosenImage, setChosenImage] = useState("");
    const [chosenName, setChosenName] = useState("");
    const [chosenPhone, setChosenPhone] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    // const position = [31.7917, -7.0926];
    const [position, setPosition] = useState([]);

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

    useEffect(() => {
        const handleclick = () => {
            Axios.get("http://localhost:5000/api/manager/checkRestaurant", {
                withCredentials: true,
            }).then((response) => {
                console.log(response.data);
                if (response.data.status === true) {
                    window.location.replace("/dash");
                } else {
                    setLoading(false);
                }
            });
        };

        handleclick();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        // Check if a file is selected
        if (file) {
            // Check if the selected file is an image
            if (file.type.startsWith("image/")) {
                setChosenImage(file);

                // Preview the image
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                // File is not an image, handle accordingly (e.g., show an error message)
                console.error("Selected file is not an image.");
                // Reset the file input (optional)
                e.target.value = null;
                // Clear image preview
                setImagePreview(null);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError([]);

        const missingFields = [];
        if (chosenName === "") missingFields.push("Name");
        if (chosenPhone === "") missingFields.push("Phone");
        if (chosenCountry === "") missingFields.push("Country");
        if (chosenCity === "") missingFields.push("City");
        if (chosenAdress === "") missingFields.push("Adress");
        if (chosenCuisine === "") missingFields.push("Cuisine");
        if (chosenImage === "") missingFields.push("Image");
        if (lat === null || lng === null) missingFields.push("cordinnates");
        // Add other fields as needed

        if (missingFields.length > 0) {
            // Show the alert
            setError(missingFields); // You need to manage the state for missing fields
            return;
        }

        const restaurant = {
            name: chosenName,
            adress: chosenAdress,
            city: chosenCity,
            country: chosenCountry,
            phone: chosenPhone,
            image: imagePreview,
            cuisineType: chosenCuisine,
            latitude: lat,
            longitude: lng,
        };
        console.log(restaurant);

        Axios.post("/api/manager/restaurant/add", restaurant, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                alert("Restaurant added successfully");
                window.location.replace("/dash");
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        // if loading render loading
        loading ? (
            <div className="flex justify-center text-2xl">loading ...</div>
        ) : (
            <div className="flex flex-col items-center mt-16">
                <h5 className="text-stone-700 text-2xl font-semibold text-center">
                    Fill Info About Your Resraurant
                </h5>
                {/* div to display errors */}
                <div className="flex flex-col items-center bg-red-500 w-full">
                    <ul>
                        {error.map((err, index) => (
                            <li key={index}>{err} is required</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-8  p-4 flex flex-col gap-2"
                        action=""
                    >
                        <div className="flex gap-2 flex-col sm:flex-row ">
                            <div>
                                <input
                                    type="text"
                                    className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    placeholder="name"
                                    onChange={(e) =>
                                        setChosenName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    placeholder="phone number"
                                    onChange={(e) =>
                                        setChosenPhone(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row ">
                            <div>
                                <CountrySelector
                                    onSelectCountry={setChosenCountry}
                                />
                            </div>
                            <div>
                                <CitySelector
                                    selectedCountry={chosenCountry}
                                    onSelectCity={setChosenCity}
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col sm:flex-row ">
                            <div>
                                <input
                                    type="text"
                                    className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    placeholder="Adress"
                                    onChange={(e) =>
                                        setChosenAdress(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    placeholder="cuisine type"
                                    onChange={(e) =>
                                        setChosenCuisine(e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex gap-2 flex-col sm:flex-row">
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-80 border-slate-500 border-1 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                    placeholder="image"
                                    onChange={handleImageChange}
                                />
                            </div>
                            {imagePreview && (
                                <div>
                                    <img
                                        src={imagePreview}
                                        alt="Image Preview"
                                        style={{
                                            maxWidth: "100px",
                                            maxHeight: "100px",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div style={{ position: "relative", width: "300px" }}>
                            <h1>Map Manager</h1>
                            {position[0] != null && (
                                <MapContainer
                                    center={position}
                                    zoom={9}
                                    scrollWheelZoom={false}
                                    style={{ height: "300px" }}
                                >
                                    <Marker
                                        position={position}
                                        icon={L.icon({
                                            iconUrl: logo,
                                            iconSize: [35, 41],
                                            iconAnchor: [12.5, 41],
                                            popupAnchor: [0, -41],
                                        })}
                                    >
                                        <Popup>Tu es ici !</Popup>
                                    </Marker>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                    <LeafletClick />
                                </MapContainer>
                            )}
                        </div>
                        <button className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50">
                            submit
                        </button>
                    </form>
                </div>
            </div>
        )
    );
}

export default FillRestaurant;
