// const request = require('supertest');
const {createRestaurant} = require('../Controllers/RestaurantController')
const Restaurant = require('../Models/Restaurant'); // Import your Restaurant model
const { validateRestaurant } = require('../validator/restaurantValidator'); // Import your validation logic

describe('Restaurant Controller', () => {
  it('should create a restaurant', async () => {
    // Mock req and res objects
    const mockReq = {
      user: { userId: 'mockUserId' },
      body: {
        // Provide necessary body data for restaurant creation
      },
    };
    const mockRes = { status: jest.fn(), json: jest.fn(), send: jest.fn() };

    // Mock the Restaurant model's create method
    Restaurant.create = jest.fn().mockResolvedValue({});

    // Mock the validateCreateRestaurant method
    validateRestaurant.validateCreateRestaurant = jest.fn().mockReturnValue({ error: null });

    // Perform the request using supertest
    await request(app)
      .post('/your_create_endpoint') // Replace with your actual create endpoint
      .send(mockReq.body)
      .expect(201); // Expected status code

    // Assert that the necessary functions were called
    expect(Restaurant.create).toHaveBeenCalledWith({
      user: mockReq.user.userId,
      name: mockReq.body.name,
      //... (other properties from req.body)
    });
  });

  // Add more test cases for error handling, validation, etc.
});