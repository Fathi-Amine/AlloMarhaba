import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loaders/ThemeLoader.jsx";
import restaurantPhoto from "../../assets/images/bread-sandwich-poster_23-2148646030.jpg";
// import LeafletGeoCoder from "../MapComponents/LeafletGeoCoder.jsx";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "../../App.css";
import { Link } from "react-router-dom";

function Restaurant() {
    const position = [34.020882, -6.84165];
    const [restaurants, setRestaurants] = useState([]);
    const [cuisineTypes, setCuisineTypes] = useState([]);
    const [selectedCuisineType, setSelectedCuisineType] = useState("");
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [searchType, setSearchType] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [searchPlace, setSearchPlace] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);
    const [mapMarkerLocations, setMapMarkerLocations] = useState([]);
    const [map, setMap] = useState(null);

    async function fetchRestaurants() {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/restaurants"
            );
            setRestaurants(response.data.restaurants);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    }

    async function fetchCuisineType() {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/restaurants/cuisine-type"
            );
            setCuisineTypes(response.data);
            console.log(cuisineTypes);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    const performSearch = async (selectedType) => {
        try {
            let apiUrl = "";

            if (selectedType === "name") {
                apiUrl = `http://localhost:5000/api/restaurants/search/${key}`;
            } else if (selectedType === "cuisineType") {
                apiUrl =
                    "http://localhost:5000/api/restaurants/searchByCuisineType";
            } else if (selectedType === "place") {
                setSearchButtonClicked(true);
                apiUrl = `http://localhost:5000/api/restaurants/search/searchByPlace/${searchPlace}`;
                const response = await axios.get(apiUrl);
                const placesData = response.data;

                if (placesData && Array.isArray(placesData.restaurants)) {
                    setMapMarkerLocations(placesData.restaurants);
                }
                console.log(mapMarkerLocations);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleRadioChange = async (event) => {
        const selectedType = event.target.value;
        setSearchType(selectedType);
        await performSearch(selectedType);
    };

    useEffect(() => {
        fetchRestaurants();
        fetchCuisineType();
    }, []);

    const handleSearchByName = async (e) => {
        const key = e.target.value;
        try {
            if (key) {
                const response = await axios.get(
                    `http://localhost:5000/api/restaurants/search/${key}`
                );
                const result = response.data.restaurants;
                if (result && result.length > 0) {
                    setRestaurants(result);
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("No restaurants found for the given search.");
                setRestaurants([]);
            } else {
                console.error("Error filtering restaurants:", error);
            }
        }
    };

    const handleSearchByCuisineType = async (e) => {
        const cuisineTypeId = e.target.value;
        try {
            setSelectedCuisineType(cuisineTypeId);
            const response = await axios.get(
                `http://localhost:5000/api/restaurants/search/cuisine-type/${cuisineTypeId}`
            );
            const result = response.data.restaurants;
            if (result) {
                setRestaurants(result);
            }
        } catch (error) {
            console.error(
                "Error filtering restaurants by cuisine type:",
                error
            );
        }
    };

    const handlePlaceSearchChange = () => {
        setSearchType("place");
    };
    const handleNameSearchChange = () => {
        setSearchType("name");
    };

    const handleSearchByPlace = (inputValue) => {
        console.log(inputValue);
    };
    useEffect(() => {
        if (
            map &&
            mapMarkerLocations &&
            Array.isArray(mapMarkerLocations) &&
            mapMarkerLocations.length > 0
        ) {
            const bounds = L.latLngBounds(
                mapMarkerLocations.map((location) => [
                    location.latitude,
                    location.longitude,
                ])
            );
            map.fitBounds(bounds);
        }
    }, [map, mapMarkerLocations]);

    return (
        <div>
            <div className="flex justify-between space-x-2">
                <div className="cuisine-type">
                    <div className="p-1 bg-[#496d73]">
                        <div className="m-5">
                            <label className="flex items-center p-2 text-gray-800 font-semibold rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-400">
                                <input
                                    type="radio"
                                    value="name"
                                    checked={searchType === "name"}
                                    onChange={handleNameSearchChange}
                                    className="opacity-0 absolute"
                                />
                                <span className="">Search by name</span>
                            </label>
                            {searchType === "name" && (
                                <input
                                    style={{ display: "block" }}
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={handleSearchByName}
                                    className='shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"'
                                />
                            )}
                        </div>
                        <div className="m-5">
                            <label className="flex items-center p-2 text-gray-800 font-semibold rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group bg-gray-400">
                                <input
                                    type="radio"
                                    value="place"
                                    checked={searchType === "place"}
                                    onChange={handlePlaceSearchChange}
                                    className="opacity-0 absolute"
                                />
                                Search by Place
                            </label>
                            {searchType === "place" && (
                                <div>
                                    <input
                                        style={{ display: "block" }}
                                        type="text"
                                        placeholder="Enter Place"
                                        value={searchPlace}
                                        onChange={(e) =>
                                            setSearchPlace(e.target.value)
                                        }
                                        className='shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text"'
                                    />
                                    <button
                                        onClick={() =>
                                            searchType === "place" &&
                                            performSearch(searchType)
                                        }
                                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded mt-3"
                                    >
                                        Search
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="bg-[#356169] h-full p-4">
                        <span className="m-5 font-bold">Cuisines Type</span>
                        <div className="cuisine-type-list">
                            <ul className="pl-0">
                                <li className="m-5">
                                    <label className="flex items-center p-2 text-gray-800 font-semibold rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <input
                                            type="checkbox"
                                            className="opacity-0 absolute"
                                            onChange={fetchRestaurants}
                                        />
                                        All Cuisine Types
                                    </label>
                                </li>
                                {cuisineTypes.map((cuisineType) => (
                                    <li className="m-5" key={cuisineType._id}>
                                        <label
                                            htmlFor={cuisineType._id}
                                            className="flex items-center p-2 text-gray-800 font-semibold rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        >
                                            <input
                                                id={cuisineType._id}
                                                type="checkbox"
                                                className="opacity-0 absolute"
                                                value={cuisineType._id}
                                                checked={
                                                    selectedCuisineType ===
                                                    cuisineType._id
                                                }
                                                onChange={
                                                    handleSearchByCuisineType
                                                }
                                            />
                                            {cuisineType.name}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="restaurants container w-4/5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {restaurants.length > 0 ? (
                            restaurants.map((restaurant) => (
                                <div
                                    key={restaurant.id}
                                    className="restaurants-cart mb-5 col-lg-4 col-md-6 col-sm-12"
                                >
                                    <Link to={`/${restaurant.slug}/products`}>
                                        <div>
                                            <img
                                                src={restaurantPhoto}
                                                alt={restaurant.name}
                                                className=""
                                            />
                                        </div>
                                        <div className="restau-info text-center">
                                            <p className="restau-name">
                                                {restaurant.name}
                                            </p>
                                            <hr className="w-1/2 mx-auto my-2" />
                                            <p className="phone-adress-info p-2">
                                                {restaurant.phone} -{" "}
                                                {restaurant.adress}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-semibold">
                                No Restaurants Found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <div>
                {searchButtonClicked && searchType === "place" && (
                    <MapContainer
                        center={[34.020882, -6.84165]}
                        zoom={7}
                        style={{ height: "100vh" }}
                        whenCreated={setMap}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {mapMarkerLocations.map((location, index) => (
                            <Marker
                                key={index}
                                position={[
                                    location.latitude,
                                    location.longitude,
                                ]}
                                style={{ position: "relative" }}
                            >
                                <Popup>
                                    <div>
                                        <h3
                                            style={{
                                                fontSize: "16px",
                                                width: "151px",
                                            }}
                                        >
                                            {location.name}
                                        </h3>
                                        <p>
                                            Cuisine: {location.cuisineType.name}
                                        </p>
                                        <Link to={`/${location.name}/products`}>
                                            Order
                                        </Link>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                )}
            </div>
        </div>
    );
}

export default Restaurant;
