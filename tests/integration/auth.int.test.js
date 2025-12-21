const request = require('supertest');

const BASE_URL = 'https://localhost:3000';

describe('Auth integration (via real server)', () => {
  const testEmail = `testuser${Date.now()}@example.com`;
  const testPassword = 'Password123';

  beforeAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  });

  test('POST /auth/register -> redirects to /movies', async () => {
    const res = await request(BASE_URL)
      .post('/auth/register')
      .send({ 
        name: 'Test User', 
        email: testEmail, 
        password: testPassword 
      });

    expect(res.status).toBe(302);
    expect(res.headers.location).toEqual(expect.stringContaining('/movies'));
  }, 30000);

  test('POST /auth/login -> sets cookie and redirects', async () => {
    const res = await request(BASE_URL)
      .post('/auth/login')
      .send({ 
        email: testEmail, 
        password: testPassword 
      });

    expect(res.status).toBe(302);
    expect(res.headers['set-cookie']).toBeDefined();
  }, 30000);
});
