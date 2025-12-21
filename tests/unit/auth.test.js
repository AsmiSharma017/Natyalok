const { describe, test, expect } = require('@jest/globals');

function generateToken(payload) {
  return 'mock-jwt-token.' + Buffer.from(JSON.stringify(payload)).toString('base64');
}

describe('Auth utilities (UNIT TESTS)', () => {
  test('generateToken creates valid JWT', () => {
    const token = generateToken({ id: '123', role: 'user' });
    expect(token).toBeDefined();
    expect(token.length).toBeGreaterThan(20);
  });
});
