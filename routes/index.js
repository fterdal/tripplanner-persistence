var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;

const hotelEndpoints = require('./hotels');
router.use('/hotels', hotelEndpoints);

const restaurantEndpoints = require('./restaurants');
router.use('/restaurants', restaurantEndpoints);

const activityEndpoints = require('./activities');
router.use('/activities', activityEndpoints);

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

module.exports = router;
