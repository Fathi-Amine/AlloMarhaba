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
                                <li className='mb-3' key={cuisineType._id}>
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
                {isLoading && <Loader />}
                <div className='restaurants cotainer-fluid'>
                    <div className='row'>
                        {restaurants.map((restaurant, index) => (
                            <div key={index} className='restaurants-cart mb-5 col-lg-4 col-md-6 col-sm-12'>
                                <div>
                                    <img src={restaurantPhoto} alt="" />
                                </div>
                                <div className='restau-info'>
                                    <p className='restau-name text-center mb-0 p-2'>{restaurant.name}</p>
                                    <hr className='w-50 d-flex justify-content-center m-auto' />
                                    <p className='phone-adress-info text-center p-2 mb-0'>{restaurant.phone} - {restaurant.adress}</p>
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