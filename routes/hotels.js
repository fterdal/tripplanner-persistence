const Promise = require('bluebird');
const router = require('express').Router();
const { Hotel } = require('../models');

// Get all hotels
router.get('/', (req, res, next) => {
  Hotel.findAll()
  .then( hotels => {
    res.json(hotels);
  })
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Hotel.findById(req.params.id)
  .then( hotel => {
    if (hotel) res.json(hotel);
    else res.sendStatus(404);
  })
  .catch(next);
})



module.exports = router;
