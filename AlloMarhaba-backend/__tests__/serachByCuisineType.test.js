const { searchByCuisineType } = require('../Controllers/RestaurantController');

// Mock the Restaurant model and its find method
const Restaurant = require('../Models/Restaurant'); 

jest.mock('../Models/Restaurant.js', () => ({
  find: jest.fn(),
}));

describe('searchByCuisineType', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should return restaurants for a valid cuisine type', async () => {
    const mockCuisineTypeId = 'validCuisineTypeId';
    const mockRestaurants = [{ name: 'Restaurant 1' }, { name: 'Restaurant 2' }];

    Restaurant.find.mockResolvedValue(mockRestaurants);

    const req = { params: { cuisineTypeId: mockCuisineTypeId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await searchByCuisineType(req, res);

    expect(Restaurant.find).toHaveBeenCalledWith({ cuisineType: mockCuisineTypeId });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ restaurants: mockRestaurants });
  });

  it('should return "No restaurants found" message for an invalid cuisine type', async () => {
    const mockCuisineTypeId = 'invalidCuisineTypeId';

    Restaurant.find.mockResolvedValue([]);

    const req = { params: { cuisineTypeId: mockCuisineTypeId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await searchByCuisineType(req, res);

    expect(Restaurant.find).toHaveBeenCalledWith({ cuisineType: mockCuisineTypeId });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No restaurants found for this category.' });
  });

  it('should handle errors and return a 500 status with an error message', async () => {
    const mockCuisineTypeId = 'validCuisineTypeId';

    Restaurant.find.mockRejectedValue(new Error('Database error'));

    const req = { params: { cuisineTypeId: mockCuisineTypeId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await searchByCuisineType(req, res);

    expect(Restaurant.find).toHaveBeenCalledWith({ cuisineType: mockCuisineTypeId });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching restaurants by category.', error: 'Database error' });
  });
});