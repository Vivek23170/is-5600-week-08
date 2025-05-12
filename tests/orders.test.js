const { create, get, list, edit } = require('../orders');
const { create: createProduct } = require('../products');
const productData = require('../data/product1.json'); 
const orderData = require('../data/order1.json');

const productTestHelper = require('./test-utils/productTestHelper');
const { log } = require('console');

describe('Orders Module', () => {
  let createdProduct;
  let createdOrder;
  
  beforeAll(async () => {
    // await productTestHelper.setupTestData();
    // await productTestHelper.createTestOrders(5);

    createdProduct = await createProduct(productData); 
    orderData.products = [createdProduct._id]; 
    createdOrder = await create(orderData); 
  });

  afterAll(async () => {
    // await productTestHelper.cleanupTestData();
    await productTestHelper.cleanupTestData1();
    
  });


  describe('create', () => {
    it('should create an order', async () => {
      expect(createdOrder).toBeDefined();
      expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
    });
  });

  describe('get', () => {
    it('should retrieve an order by id', async () => {
      const order = await get(createdOrder._id);
      expect(order).toBeDefined();
      expect(order._id).toBe(createdOrder._id);
    });
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(0);
    });
  });

  describe('edit', () => {
    it('should edit an order', async () => {
      const change = { status: 'COMPLETED' }; 
      const editedOrder = await edit(createdOrder._id, change);
      expect(editedOrder).toBeDefined();
      expect(editedOrder.status).toBe('COMPLETED');
    });
  });
});