const { Router } = require('express');
const Card = require('../models/Card');

module.exports = Router()

  .post('/', (req, res, next) => {
    Card
      .insert(req.body)
      .then(card => res.send(card))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Card
      .find()
      .then(card => res.send(card))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Card
      .findById(req.params.id)
      .then(card => res.send(card))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Card
      .delete(req.params.id)
      .then(card => res.send(card))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Card
      .update(req.params.id, req.body)
      .then(card => res.send(card))
      .catch(next);
  });
