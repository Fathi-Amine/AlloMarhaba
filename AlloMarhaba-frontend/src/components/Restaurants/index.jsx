import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';

// import './index.css'
import restaurantPhoto from '../../assets/images/bread-sandwich-poster_23-2148646030.jpg'

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
                <div className='restaurants cotainer-fluid'>
                    <div className='row'>
                        {restaurants.map((restaurant) => (
                            <div className='restaurants-cart mb-5 col-lg-4 col-md-6 col-sm-12'>
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
        </div>
    );
}

export default Restaurant;