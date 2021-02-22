const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Card = require('../lib/models/Card');

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

  it('Gets all flash cards via GET', async() => {
    const cards = await Promise.all([
      { keyTerm: 'CORS', definition: 'Cross-Origin Resource Sharing', topic: 'JavaScript' },
      { keyTerm: 'DOM', definition: 'Document Object Model', topic: 'JavaScript' },
      { keyTerm: 'JWT', definition: 'JSON Web Token', topic: 'JavaScript' }
    ].map(card => Card.insert(card)));

    return request(app)
      .get('/api/v1/cards')
      .then(res => {
        cards.forEach(card => {
          expect(res.body).toContainEqual(card);
        });
      });
  });

});
