import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css'

function Restaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [cuisineTypes, setCuisineTypes] = useState([]);
    const [selectedCuisineType, setSelectedCuisineType] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [searchType, setSearchType] = useState('');


    async function fetchRestaurants() {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants');
            setRestaurants(response.data.restaurants);
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
                apiUrl = 'http://localhost:5000/api/restaurants/searchByPlace';
            }

            const response = await axios.get(apiUrl);

            console.log(data);
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
            // console.log(selectedCuisineType);
            const response = await axios.get(`http://localhost:5000/api/restaurants/search/cuisine-type/${cuisineTypeId}`);
            const result = response.data.restaurants;
            if (result) {
                setRestaurants(result);
            }
        } catch (error) {
            console.error('Error filtering restaurants by cuisine type:', error);
        }
    };


    return (
        <div>
            <label>
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
            )}
        </div>
    );
}

export default Restaurant;