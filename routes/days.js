const Promise = require('bluebird');
const router = require('express').Router();
const { Day } = require('../models');

// Get all days
router.get('/', (req, res, next) => {
  Day.findAll()
  .then( days => {
    res.json(days);
  })
  .catch(next);
})

// router.get('/desc', (req, res, next) => {
//   Day.getLargestNumber()
//   .then( days => {
//     res.json(days);
//   })
//   .catch(console.error.bind(console))
// })

router.get('/:id', (req, res, next) => {
  Day.findById(req.params.id)
  .then( day => {
    if (day) res.json(day);
    else res.sendStatus(404);
  })
  .catch(next);
})

router.post('/', (req, res, next) => {
  Day.getLargestNumber()
  Day.create({})
  .then( day => {
    res.json(day);
  })
})

module.exports = router;
