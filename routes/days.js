const Promise = require('bluebird');
const router = require('express').Router();
const { Day, Restaurant, Hotel, Activity } = require('../models');

// Get a day's restaurants
router.get('/:id/restaurants', (req, res, next) => {
  Day.findById(req.params.id, {
    include: [{
      model: Restaurant
    }]
  })
  .then( day => {
    if (day) return day;
    else throw new Error("Day Not Found");
  })
  .then( day => {
    res.json(day);
  })
  .catch(next);
})

// TODO Add better error handling for the case when a user
// enters an id for a non-existent day or restaurant.
router.put('/:id/restaurants/:restaurantid', (req, res, next) => {
  let day = Day.findById(req.params.id);
  let restaurant = Restaurant.findById(req.params.restaurantid);
  Promise.all([day, restaurant])
  .spread( (day, restaurant) => {
    return day.addRestaurant(restaurant);
  })
  .then( () => {
    res.sendStatus(201);
  })
  .catch(next);
})

// TODO Add better error handling for the case when a user
// enters an id for a non-existent day or activity.
router.put('/:id/activities/:activityid', (req, res, next) => {
  let day = Day.findById(req.params.id);
  let activity = Activity.findById(req.params.activityid);
  Promise.all([day, activity])
  .spread( (day, activity) => {
    return day.addActivity(activity);
  })
  .then( () => {
    res.sendStatus(201);
  })
  .catch(next);
})

// Get a day's activities
router.get('/:id/activities', (req, res, next) => {
  Day.findById(req.params.id, {
    include: [{
      model: Activity
    }]
  })
  .then( day => {
    if (day) return day;
    else throw new Error("Day Not Found");
  })
  .then( day => {
    res.json(day);
  })
  .catch(next);
})

// Get a specific day
router.get('/:id', (req, res, next) => {
  Day.findById(req.params.id)
  .then( day => {
    if (day) res.json(day);
    else res.sendStatus(404);
  })
  .catch(next);
})

// Get all days
router.get('/', (req, res, next) => {
  Day.findAll()
  .then( days => {
    res.json(days);
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
