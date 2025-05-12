const { mockDb, mockModel, mockProducts } = require('./db.mock'); 

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

const { get, list, edit, destroy } = require('../products');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Product Module', () => {


    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('list', () => {
        it('should list products', async () => {
            const products = await list();
            expect(products.length).toBe(2);
            expect(products[0].description).toBe('Product 1');
            expect(products[1].description).toBe('Product 2');
        });
    });

    describe('get', () => {
        it('should get a product by id', async () => {
            mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
            const product = await get('123');
            expect(product.description).toBe('Product 1');
            expect(mockModel.findById).toHaveBeenCalledWith('123');
        });
    });

    describe('edit', () => {
        it('should edit a product', async () => {
            // Define the changes (e.g., updating the product description)
            const changes = { description: 'Updated Product 1' };

            // Mock the findById method to return a mock product
            const mockProduct = { description: 'Product 1', save: jest.fn().mockResolvedValue({ description: 'Updated Product 1' }) };
            mockModel.findById = jest.fn().mockResolvedValue(mockProduct);

            const updatedProduct = await edit('123', changes);

            expect(updatedProduct).toBeDefined();
            expect(updatedProduct.description).toBe('Updated Product 1');
            expect(mockProduct.save).toHaveBeenCalled();
        });
    });

    describe('destroy', () => {
        it('should delete a product', async () => {
            mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });

            const result = await destroy('123');
            expect(result.deletedCount).toBe(1);
            expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: '123' });
        });
    });
});