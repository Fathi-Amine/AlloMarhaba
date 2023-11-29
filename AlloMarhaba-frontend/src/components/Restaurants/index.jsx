import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from "../loaders/ThemeLoader.jsx";
import 'bootstrap/dist/css/bootstrap.css';
// import './index.css';
import restaurantPhoto from '../../assets/images/bread-sandwich-poster_23-2148646030.jpg'
// import LeafletGeoCoder from "../MapComponents/LeafletGeoCoder.jsx";
import {MapContainer, TileLayer, Marker,Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import '../../App.css'
import {Link} from "react-router-dom";

function Restaurant() {
    const position = [34.020882, -6.841650]
    const [restaurants, setRestaurants] = useState([]);
    const [cuisineTypes, setCuisineTypes] = useState([]);
    const [selectedCuisineType, setSelectedCuisineType] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [searchType, setSearchType] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [searchPlace, setSearchPlace] = useState('');
    const [searchButtonClicked, setSearchButtonClicked] = useState(false);
    const [mapMarkerLocations, setMapMarkerLocations] = useState([]);
    const [map, setMap] = useState(null);


    async function fetchRestaurants() {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants');
            setRestaurants(response.data.restaurants);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    }

    async function fetchCuisineType() {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants/cuisine-type');
            setCuisineTypes(response.data);
            console.log(cuisineTypes)
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    const performSearch = async (selectedType) => {
        try {
            let apiUrl = '';

            if (selectedType === 'name') {
                apiUrl = 'http://localhost:5000/api/restaurants/searchByName';
            } else if (selectedType === 'cuisineType') {
                apiUrl = 'http://localhost:5000/api/restaurants/searchByCuisineType';
            } else if (selectedType === 'place') {
                setSearchButtonClicked(true);
                apiUrl = `http://localhost:5000/api/restaurants/search/searchByPlace/${searchPlace}`;
                const response = await axios.get(apiUrl);
                const placesData = response.data;

                if (placesData && Array.isArray(placesData.restaurants)) {
                    // Update the state or pass the data to the LeafletGeoCoder component
                    setMapMarkerLocations(placesData.restaurants);

                }
                console.log(mapMarkerLocations)
            }

            // const response = await axios.get(apiUrl);

            // console.log(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleRadioChange = async (event) => {
        const selectedType = event.target.value;
        setSearchType(selectedType);
        await performSearch(selectedType);
    };

    useEffect(() => {
        fetchRestaurants();
        fetchCuisineType()
    }, []);

    const handleSearchByName = async (e) => {
        const key = e.target.value;
        try {
            if (key) {
                const response = await axios.get(`http://localhost:5000/api/restaurants/search/${key}`);
                const result = response.data.restaurants;
                if (result) {
                    setRestaurants(result);
                }
            } else {
                if (selectedCuisineType) {
                    const response = await axios.get(`http://localhost:5000/api/restaurants/search/cuisine-type/${selectedCuisineType}`);
                    const result = response.data.restaurants;
                    if (result) {
                        setRestaurants(result);
                    }
                } else {
                    fetchRestaurants();
                }
            }
        } catch (error) {
            console.error('Error filtering restaurants:', error);
        }
    };

    const handleSearchByCuisineType = async (e) => {
        const cuisineTypeId = e.target.value;
        try {
            setSelectedCuisineType(cuisineTypeId);
            const response = await axios.get(`http://localhost:5000/api/restaurants/search/cuisine-type/${cuisineTypeId}`);
            const result = response.data.restaurants;
            if (result) {
                setRestaurants(result);
            }
        } catch (error) {
            console.error('Error filtering restaurants by cuisine type:', error);
        }
    };

    const handlePlaceSearchChange = () => {
        setSearchType('place');
    };

    const handleSearchByPlace = (inputValue) => {
        console.log(inputValue)
    }
    useEffect(() => {
        if (map && mapMarkerLocations && Array.isArray(mapMarkerLocations) && mapMarkerLocations.length > 0) {
            const bounds = L.latLngBounds(mapMarkerLocations.map((location) => [location.latitude, location.longitude]));
            map.fitBounds(bounds);
        }
    }, [map, mapMarkerLocations]);

    {/* <label>
                <input
                    type="radio"
                    name="searchType"
                    value="name"
                    onChange={handleRadioChange}
                />
                Search by name
            </label>
            <label>
                <input
                    type="radio"
                    name="searchType"
                    value="cuisineType"
                    onChange={handleRadioChange}
                />
                Search by category
            </label>
            <label>
                <input
                    type="radio"
                    name="searchType"
                    value="place"
                    onChange={handleRadioChange}
                />
                Search by place
            </label>
            <h2>Restaurant List</h2>
            <input type="text" placeholder='Search Restaurants ...' onChange={handleSearchByName} />

            <div>
                <h3>Cuisine Types:</h3>
                {cuisineTypes.map((cuisineType) => (
                    <label key={cuisineType._id}>
                        <input
                            type="radio"
                            value={cuisineType._id}
                            checked={selectedCuisineType === cuisineType._id}
                            onChange={handleSearchByCuisineType}
                        />
                        {cuisineType.name}
                    </label>
                ))}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant) => (
                        <tr key={restaurant._id} onClick={() => setSelectedRestaurant(restaurant)}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.address}</td>
                            <td>{restaurant.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRestaurant && (
                <div>
                    <h3>Map</h3>
                    <div style={{ width: '400px', height: '300px' }}>
                        <iframe
                            title="restaurant-map"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            // scrolling="no"
                            // marginHeight="0"
                            // marginWidth="0"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDJgIklIuxFQJF_rewtegFNBKXWKegQeEY&q=${selectedRestaurant.latitude},${selectedRestaurant.longitude}`}
                        ></iframe>
                    </div>
                </div>
            )} */}

    return (

        <div>
            <div>
                <label>
                    <input
                        type="radio"
                        value="place"
                        checked={searchType === 'place'}
                        onChange={handlePlaceSearchChange}
                    />
                    Search by Place
                </label>
                {searchType === 'place' && (
                    <input
                        style={{display:'block'}}
                        type="text"
                        placeholder="Enter Place"
                        value={searchPlace}
                        onChange={(e) => setSearchPlace(e.target.value)}
                    />
                )}
                <button onClick={() => searchType === 'place' && performSearch(searchType)}>Search</button>
            </div>

            <div className='d-flex justify-content-between'>
                <div className='cuisine-type'>
                    <span className='p-2'>Cuisines Type</span>
                    <div className='cuisine-type-list'>
                        <ul className='pl-0'>
                            {cuisineTypes.map((cuisineType) => (
                                <li className='m-3' key={cuisineType._id}>
                                    <label key={cuisineType._id}>
                                        <input
                                            type="checkbox"
                                            className='mr-2'
                                            value={cuisineType._id}
                                            checked={selectedCuisineType === cuisineType._id}
                                            onChange={handleSearchByCuisineType}
                                        />
                                        {cuisineType.name}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='restaurants cotainer-fluid'>
                    <div className='row'>
                        {restaurants.map((restaurant) => (
                            <div className='restaurants-cart mb-5 col-lg-4 col-md-6 col-sm-12'>
                                <div>
                                    <img
                                        src={restaurantPhoto}
                                        alt={restaurant.name}
                                        className=""
                                    />
                                </div>
                                <div className="restau-info text-center">
                                    <p className="restau-name">{restaurant.name}</p>
                                    <hr className="w-1/2 mx-auto my-2" />
                                    <p className="phone-adress-info p-2">
                                        {restaurant.phone} - {restaurant.adress}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                {searchButtonClicked && searchType === 'place' && (
                    <MapContainer
                        center={[34.020882, -6.841650]}  // Set the center to Rabat, Morocco
                        zoom={7}
                        style={{ height: '100vh' }}
                        whenCreated={setMap}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {mapMarkerLocations.map((location, index) => (
                            <Marker
                                key={index}
                                position={[location.latitude, location.longitude]}
                                style={{position:'relative'}}
                            >
                                <Popup >
                                    <div>
                                        <h3 style={{fontSize:'16px', width:'151px'}}>{location.name}</h3>
                                        <p>Cuisine: {location.cuisineType.name}</p>
                                        <Link to={`/${location.name}/products`}>Order</Link>                                        {/* <img src={location.image} alt={location.name}></img> */}
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