const mongoose = require('mongoose');
const User = require('../Models/Users'); 
const Restaurant = require('../Models/Restaurant'); 
const CuisineType = require('../Models/CuisineType');

async function seedData() {
    try {
        await mongoose.connect('mongodb+srv://aminefathimw:Youcode2022@cluster0.oxh1edt.mongodb.net/auth_jwt?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const fakeCuisineType = [
            {
                name: 'mexicana',
            },
            {
                name: 'colombiana',
            },
            {
                name: 'canada',
            }
        ];

        await CuisineType.insertMany(fakeCuisineType);

        const users = await User.find({}, '_id');
        
        const cuisineType = await CuisineType.find({}, '_id');

        // const fakeRestaurantType = [
        //     {
        //         user: users[0]._id,
        //         name: 'Restaurant4',
        //         adress: "add6",
        //         city: "Tanger",
        //         country: "Morocco",
        //         state: "state7",
        //         phone: "24323",
        //         image: "image9.jpg",
        //         cuisineType: cuisineType[1]._id,
        //         latitude: "35.50289825368637",
        //         longitude: "-7.430877685546876"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Le Petit Rocher",
        //         adress: "33.5953, -7.6194",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212611234567",
        //         image: "image9.jpg",
        //         cuisineType: "French Cuisine",
        //         latitude: "33.5953",
        //         longitude: "-7.6194"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Rick's Café",
        //         adress: "33.5893, -7.6121",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212621234567",
        //         image: "image9.jpg",
        //         cuisineType: "International Cuisine",
        //         latitude: "33.5893",
        //         longitude: "-7.6121"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Sky 28",
        //         adress: "33.5931, -7.6358",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212631234567",
        //         image: "image9.jpg",
        //         cuisineType: "Mediterranean Cuisine",
        //         latitude: "33.5931",
        //         longitude: "-7.6358"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "La Sqala",
        //         adress: "33.5949, -7.6061",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212641234567",
        //         image: "image9.jpg",
        //         cuisineType: "Moroccan Cuisine",
        //         latitude: "33.5949",
        //         longitude: "-7.6061"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Enab Beirut",
        //         adress: "33.5945, -7.6340",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212651234567",
        //         image: "image9.jpg",
        //         cuisineType: "Lebanese Cuisine",
        //         latitude: "33.5945",
        //         longitude: "-7.6340"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Le Cabestan",
        //         adress: "33.5796, -7.6619",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212661234567",
        //         image: "image9.jpg",
        //         cuisineType: "Seafood",
        //         latitude: "33.5796",
        //         longitude: "-7.6619"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Bistronome",
        //         adress: "33.5869, -7.6418",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212671234567",
        //         image: "image9.jpg",
        //         cuisineType: "European Cuisine",
        //         latitude: "33.5869",
        //         longitude: "-7.6418"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Loubnane",
        //         adress: "33.5897, -7.6178",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212681234567",
        //         image: "image9.jpg",
        //         cuisineType: "Lebanese Cuisine",
        //         latitude: "33.5897",
        //         longitude: "-7.6178"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "Le Grill du Sofitel",
        //         adress: "33.5926, -7.6335",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212691234567",
        //         image: "image9.jpg",
        //         cuisineType: "Steakhouse",
        //         latitude: "33.5926",
        //         longitude: "-7.6335"
        //     },
        //     {
        //         user: "users[0]._id",
        //         name: "La Mamma",
        //         adress: "33.5904, -7.6200",
        //         city: "Casablanca",
        //         country: "Morocco",
        //         state: "Casablanca-Settat",
        //         phone: "+212701234567",
        //         image: "image9.jpg",
        //         cuisineType: "Italian Cuisine",
        //         latitude: "33.5904",
        //         longitude: "-7.6200"
        //     }
        // ];
        //
        // await Restaurant.insertMany(fakeRestaurantType);

        console.log('Fake data seeded successfully');

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

seedData();