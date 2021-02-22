const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('Server routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Creates a flash card via POST', async() => {
    return request(app)
      .post('/api/v1/cards')
      .send({
        keyTerm: 'HTTP',
        definition: 'Hypertext Transfer Protocol',
        topic: 'web'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          keyTerm: 'HTTP',
          definition: 'Hypertext Transfer Protocol',
          topic: 'web'
        });
      });
  });
});
