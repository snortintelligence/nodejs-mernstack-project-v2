// Write Test Cases
const request = require('supertest');
const app = require('./application');

describe('E-Commerce API', () => {  
    it('should return a welcome message', async() => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Welcome at e-commerce app.');
    });

    it('should return a list of products', async() => {
        const response = await request(app).get('/api/products');
        expect(response.body).toHaveLength(2);
    });

    it('should return a specific product by id', async() => {
        const response = await request(app).get('/api/products/1');
        expect(response.body.id).toBe(1);
    });

    it('should create a new product', async () => {
        const newProduct = {
          title: 'New Product',
          price: 100,
          description: 'A new product for testing',
          category: 'test'
        };
        const response = await request(app).post('/api/products').send(newProduct);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newProduct.title);
      });

      it('should update details of a product by ID', async () => {
        const productId = 1; // Replace with an actual product ID
        const updatedProduct = {
          title: 'Updated Product',
          price: 150,
          description: 'An updated product for testing',
          category: 'test'
        };
    
        const response = await request(app).put(`/api/products/${productId}`).send(updatedProduct);
        expect(response.status).toBe(200);
        expect(response.body.title).toBe(updatedProduct.title);
      });

      it('should delete a product by ID', async () => {
        const productId = 1; // Replace with an actual product ID
    
        const response = await request(app).delete(`/api/products/${productId}`);
        expect(response.status).toBe(200);
    
        // Verify that the product has been deleted by trying to fetch it again
        const fetchResponse = await request(app).get(`/api/products/${productId}`);
        expect(fetchResponse.status).toBe(404);
      });

});