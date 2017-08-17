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
  .then( largestNum => {
    return Day.create({
      number: largestNum+1,
    })
  })
  .then( day => {
    res.json(day);
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Day.findById(req.params.id)
  .then( day => {
    const dayNum = day.number;
    if (day) return [dayNum, day.destroy()]
    else {
      res.sendStatus(404);
      throw new Error("Day Not Found");
    }
  })
  .spread( (dayNum, destroyedDay) => {
    return Day.findAll({
      where: {
        number: {
          $gt: dayNum
        }
      }
    })
  })
  .then( allGreater => {
    return allGreater.forEach( day => {
      day.number--;
      day.save();
    })
  })
  .then( () => {
    res.sendStatus(202);
  })
  .catch( err => { return next(err) })
})

module.exports = router;

/*














*/
