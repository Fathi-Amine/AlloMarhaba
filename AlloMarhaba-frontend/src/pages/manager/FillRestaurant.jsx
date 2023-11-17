import Axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LeafletClick from "../../components/LeafletClick.jsx";
import logo from "../../assets/logolocation.png";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

function FillRestaurant() {
    const [countries, setCountries] = useState("");
    const [chosenCountry, setChosenCountry] = useState("");

    // const position = [31.7917, -7.0926];
    const [position, setPosition] = useState([]);

    const [cities, setCities] = useState("");
    const [chosenCity, setChosenCity] = useState("");

    const config = {
        cUrl: "https://api.countrystatecity.in/v1/countries",
        ckey: "N0N3OVpvYUdJU1VFV2pQeU9ETVJocVcwVDZ0YXFjeGFpTGhVYUpBQg==",
    };

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
                console.log(response.data.status);
            });
        };
        const getCountries = () => {
            Axios.get(config.cUrl, {
                headers: {
                    "X-CSCAPI-KEY": config.ckey,
                },
            }).then((response) => {
                // console.log(response.data);
                setCountries(response.data);
            });
        };

        handleclick();
        getCountries();
    }, []);

    const handlecountrychange = (e) => {
        const selectedCountryCode = e.target.value;
        console.log(selectedCountryCode);
        setChosenCountry(selectedCountryCode);
        setChosenCity("");

        Axios.get(
            `https://api.countrystatecity.in/v1/countries/${selectedCountryCode}/cities`,
            {
                headers: {
                    "X-CSCAPI-KEY": config.ckey,
                },
            }
        ).then((response) => {
            console.log(response.data);
            setCities(response.data);
        });
    };

    const handlecitychange = (e) => {
        const selectedCityCode = e.target.value;
        console.log(selectedCityCode);
        setChosenCity(selectedCityCode);
    };

    return (
        <div className="flex flex-col items-center mt-16">
            <h5 className="text-stone-700 text-2xl font-semibold text-center">
                Fill Info About Your Resraurant
            </h5>
            <div>
                <form className="mt-8  p-4 flex flex-col gap-2" action="">
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="name"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="phone number"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <select
                                value={chosenCountry}
                                onChange={handlecountrychange}
                                name=""
                                className="w-80 border-slate-500 border-1 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            >
                                <option value="" disabled>
                                    Select a country
                                </option>
                                {countries &&
                                    countries.map((country) => (
                                        <option
                                            key={country.iso2}
                                            value={country.iso2}
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <select
                                value={chosenCity}
                                onChange={handlecitychange}
                                name=""
                                className="w-80 border-slate-500 border-1 px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                            >
                                <option value="" disabled>
                                    Select a city
                                </option>
                                {cities &&
                                    cities.map((city) => (
                                        <option key={city.id} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="Adress"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="longitude"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="latitude"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row ">
                        <div>
                            <input
                                type="text"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="cuisine type"
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                className="w-80 border-slate-500 border-1 px-2 py-2  rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                                placeholder="image"
                            />
                        </div>
                    </div>
                </form>
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
                    checkckc
                </button>
            </div>
        </div>
    );
}

export default FillRestaurant;
