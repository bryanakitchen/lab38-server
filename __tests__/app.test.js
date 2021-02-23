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

  it('Deletes a flash card via DELETE', async() => {
    const card = await Card.insert({ keyTerm: 'DOM', definition: 'Document Object Model', topic: 'JavaScript' });

    return request(app)
      .delete(`/api/v1/cards/${card.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          keyTerm: 'DOM', 
          definition: 'Document Object Model', 
          topic: 'JavaScript'
        });
      });
  });

  it('Updates a flash card via PUT', async() => {
    const card = await Card.insert({ keyTerm: 'DIM', definition: 'Document Object Model', topic: 'JavaScript' });

    return request(app)
      .put(`/api/v1/cards/${card.id}`)
      .send({
        keyTerm: 'DOM', 
        definition: 'Document Object Model', 
        topic: 'JavaScript'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          keyTerm: 'DOM', 
          definition: 'Document Object Model', 
          topic: 'JavaScript'
        });
      });
  });

});
