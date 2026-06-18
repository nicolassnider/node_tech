process.env.NODE_ENV = 'test';

import test, { mock } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { settings } from '../config/settings.js';

// MOCK: Mockear ProductModel antes de importar la app
import { ProductModel } from '../models/product.model.js';

const mockProducts = [
  { id: 'prod_1', name: 'Zapatillas', price: 100 },
  { id: 'prod_2', name: 'Remera', price: 50 },
];

mock.method(ProductModel.prototype, 'fetchAllProducts', async () => mockProducts);
mock.method(ProductModel.prototype, 'fetchProductById', async (id) => {
  if (id === 'prod_1') return mockProducts[0];
  return null;
});
mock.method(ProductModel.prototype, 'insertProduct', async (data) => {
  return { id: 'prod_new', ...data };
});
mock.method(ProductModel.prototype, 'removeProduct', async (id) => {
  return true;
});
mock.method(ProductModel.prototype, 'modifyProduct', async (id, data) => {
  return { id, ...data };
});

// Importar la app después de mockear
const app = (await import('../index.js')).default;

// Generar un token válido para las pruebas
const testToken = jwt.sign(
  { id: 'user_123', email: 'admin@tienda.com' },
  settings.JWT_SECRET || 'tu_secreto_aqui_para_desarrollo',
  { expiresIn: '1h' }
);

test('Products Endpoints - CRUD', async (t) => {
  await t.test('GET /api/products - Debería obtener la lista de productos', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${testToken}`);
      
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.length, 2);
    assert.strictEqual(response.body[0].name, 'Zapatillas');
  });

  await t.test('GET /api/products/:id - Debería obtener un producto por ID', async () => {
    const response = await request(app)
      .get('/api/products/prod_1')
      .set('Authorization', `Bearer ${testToken}`);
      
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.name, 'Zapatillas');
  });

  await t.test('GET /api/products/:id - Debería retornar 404 si el producto no existe', async () => {
    const response = await request(app)
      .get('/api/products/invalid_id')
      .set('Authorization', `Bearer ${testToken}`);
      
    assert.strictEqual(response.status, 404);
  });

  await t.test('POST /api/products/create - Debería crear un nuevo producto', async () => {
    const newProduct = { name: 'Pantalón', price: 150 };
    const response = await request(app)
      .post('/api/products/create')
      .set('Authorization', `Bearer ${testToken}`)
      .send(newProduct);
      
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.body.name, 'Pantalón');
    assert.strictEqual(response.body.id, 'prod_new');
  });

  await t.test('PUT /api/products/:id - Debería actualizar un producto existente', async () => {
    const updatedData = { name: 'Zapatillas Pro', price: 120 };
    const response = await request(app)
      .put('/api/products/prod_1')
      .set('Authorization', `Bearer ${testToken}`)
      .send(updatedData);
      
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.name, 'Zapatillas Pro');
    assert.strictEqual(response.body.id, 'prod_1');
  });

  await t.test('DELETE /api/products/:id - Debería eliminar un producto', async () => {
    const response = await request(app)
      .delete('/api/products/prod_1')
      .set('Authorization', `Bearer ${testToken}`);
      
    assert.strictEqual(response.status, 200);
    assert.ok(response.body.message.includes('eliminado'));
  });

  await t.test('DELETE /api/products/:id - Debería retornar 404 si no existe', async () => {
    const response = await request(app)
      .delete('/api/products/invalid_id')
      .set('Authorization', `Bearer ${testToken}`);
      
    assert.strictEqual(response.status, 404);
  });

  await t.test('PUT /api/products/:id - Debería retornar 404 si no existe', async () => {
    const response = await request(app)
      .put('/api/products/invalid_id')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ name: 'Falso' });
      
    assert.strictEqual(response.status, 404);
  });
});
