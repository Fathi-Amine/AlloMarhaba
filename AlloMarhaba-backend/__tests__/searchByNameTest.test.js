const { searchRestaurantByName } = require('../Controllers/RestaurantController')

const Restaurant = require('../Models/Restaurant')

jest.mock('../Models/Restaurant.js', () => ({
    find: jest.fn(),
  }));

  describe('searchRestaurantByName', () => {
    it('should return restaurants if found', async () => {
      const mockRestaurants = [{ name: 'Restaurant 1' }, { name: 'Restaurant 2' }];
      const req = { params: { key: 'searchKeyword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the find method of the Restaurant model to resolve with mockRestaurants
      Restaurant.find.mockResolvedValue(mockRestaurants);
  
      await searchRestaurantByName(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ restaurants: mockRestaurants });
    });
  
    it('should return a "No restaurants found" message if no restaurants are found', async () => {
      const req = { params: { key: 'nonExistentKeyword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the find method of the Restaurant model to resolve with an empty array
      Restaurant.find.mockResolvedValue([]);
  
      await searchRestaurantByName(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No restaurants found.' });
    });
  
    it('should handle errors and return a 500 status with an error message', async () => {
      const req = { params: { key: 'searchKeyword' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mocking the find method of the Restaurant model to throw an error
      Restaurant.find.mockRejectedValue(new Error('Database error'));
  
      await searchRestaurantByName(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching restaurants.', error: 'Database error' });
    });
  });

