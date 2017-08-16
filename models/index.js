var db = require('./_db');

const Place = require('./place');
const Hotel = require('./hotel');
const Restaurant = require('./restaurant');
const Activity = require('./activity');
const Day = require('./day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);
Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {through: 'restaurantDay'});
Day.belongsToMany(Activity, {through: 'activityDay'});

module.exports = {
	db,
	Place,
	Hotel,
	Restaurant,
	Activity,
	Day
};
