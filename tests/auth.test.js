process.env.NODE_ENV = 'test';

import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../index.js';

test('Auth Endpoints - /auth/login', async (t) => {
  await t.test('Debería retornar 400 si faltan credenciales', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({});
      
    assert.strictEqual(response.status, 400);
    // El mensaje de error depende de lo configurado en AUTH_MESSAGES
    assert.ok(response.body.message);
  });

  await t.test('Debería retornar 401 si las credenciales son inválidas', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'fake@example.com', password: 'wrongpassword123' });
      
    assert.strictEqual(response.status, 401);
    assert.ok(response.body.message);
  });
});
