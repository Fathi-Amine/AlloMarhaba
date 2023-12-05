const { displayRestaurants } = require('../Controllers/RestaurantController');

// Mock the Restaurant model and its find method
const Restaurant = require('../Models/Restaurant'); // 

jest.mock('../Models/Restaurant.js', () => ({
  find: jest.fn(),
}));

describe('displayRestaurants', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should return all restaurants when found', async () => {
    const mockRestaurants = [
      { name: 'Restaurant 1' },
      { name: 'Restaurant 2' },
    ];

    Restaurant.find.mockResolvedValue(mockRestaurants);

    const req = {};
    const res = {
      json: jest.fn(),
    };

    await displayRestaurants(req, res);

    expect(Restaurant.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ restaurants: mockRestaurants });
  });

  it('should handle errors and return a 500 status with an error message', async () => {
    Restaurant.find.mockRejectedValue(new Error('Database error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await displayRestaurants(req, res);

    expect(Restaurant.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching restaurants.', error: 'Database error' });
  });
});