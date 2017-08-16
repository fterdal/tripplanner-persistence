const Promise = require('bluebird');
const router = require('express').Router();
const { Restaurant } = require('../models');

// Get all restaurants
router.get('/', (req, res, next) => {
  Restaurant.findAll()
  .then( restaurants => {
    res.json(restaurants);
  })
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Restaurant.findById(req.params.id)
  .then( restaurant => {
    if (restaurant) res.json(restaurant);
    else res.sendStatus(404);
  })
  .catch(next);
})

module.exports = router;
