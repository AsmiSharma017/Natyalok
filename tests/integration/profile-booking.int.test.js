const request = require('supertest');

const BASE_URL = 'https://localhost:3000';

describe('Profile & booking integration (via real server)', () => {
  const testEmail = `bookinguser${Date.now()}@example.com`;
  const testPassword = 'Password123';

  beforeAll(() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  });

  test('Auth flow: register -> profile access', async () => {
    const agent = request.agent(BASE_URL);
    
    // Register
    const registerRes = await agent
      .post('/auth/register')
      .send({ 
        name: 'Test User', 
        email: testEmail, 
        password: testPassword 
      });

    expect(registerRes.status).toBe(302);

    // Profile should be accessible after login/redirect
    const profileRes = await agent.get('/profile');
    expect([200, 302]).toContain(profileRes.status);
  }, 30000);
});
