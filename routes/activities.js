const Promise = require('bluebird');
const router = require('express').Router();
const { Activity } = require('../models');

// Get all activities
router.get('/', (req, res, next) => {
  Activity.findAll()
  .then( activities => {
    res.json(activities);
  })
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Activity.findById(req.params.id)
  .then( activity => {
    if (activity) res.json(activity);
    else res.sendStatus(404);
  })
  .catch(next);
})

module.exports = router;
