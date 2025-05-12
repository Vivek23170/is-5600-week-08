// tests/db.mock.js

/**
 * Mock data to be returned by our mock database queries.
 * This simulates the documents we'd typically get from MongoDB.
 */
const mockProducts = [
    { description: 'Product 1' },
    { description: 'Product 2' }
];

/**
 * Mock Mongoose Query object.
 * This simulates Mongoose's chainable query interface.
 * For example, in real Mongoose you can do: Model.find().sort().skip().limit()
 * 
 * mockReturnThis() is used to make methods chainable by returning 'this'
 * exec() and then() both resolve with our mockProducts to simulate a DB response
 */
const mockQuery = {
    sort: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
    skip: jest.fn().mockReturnThis(),  // Returns 'this' to allow chaining
    limit: jest.fn().mockReturnThis(), // Returns 'this' to allow chaining
    exec: jest.fn().mockResolvedValue(mockProducts),  // Simulates DB query execution
    then: function(resolve) { resolve(mockProducts) }  // Makes the query thenable (Promise-like)
};

/**
 * Mock Mongoose Model object.
 * This simulates the methods available on a Mongoose model (e.g., Product model).
 * The find() method returns our mockQuery to allow for method chaining.
 */
const mockModel = {
    find: jest.fn().mockReturnValue(mockQuery),
    findById: jest.fn(),
    // findById: jest.fn().mockResolvedValue(mockProducts[0]), // Add findById method
    save: jest.fn(),
    // deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    deleteOne: jest.fn(),
};

/**
 * Mock DB object that simulates the mongoose db interface.
 * In real code, we use db.model('Product') to get the Product model.
 * Here, we return our mockModel whenever model() is called.
 */
const mockDb = {
    model: jest.fn().mockReturnValue(mockModel),
    // findById: jest.fn().mockResolvedValue(mockProducts[0]),
    // save: jest.fn(),
    
};

module.exports = {
    mockDb,        
    mockProducts, 
    mockModel,     
    mockQuery     
};