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

        const fakeRestaurantType = [
            {
                user: users[0]._id,
                name: 'Restaurant4',
                adress: "add6",
                city: "Tanger",
                country: "Morocco",
                state: "state7",
                phone: "24323",
                image: "image9.jpg",
                cuisineType: cuisineType[1]._id,
                latitude: "35.50289825368637",
                longitude: "-7.430877685546876"
            },
        ];

        await Restaurant.insertMany(fakeRestaurantType);

        console.log('Fake data seeded successfully');

        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

seedData();