/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const db = require('./_db');
const { Hotel, Restaurant, Activity } = require('../models');

let Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER,
  }
});

Day.getLargestNumber = function() {
  console.log("HELLO WORLD!!!");
  return Day.findAll({
    order: [
      ['number', 'DESC']
    ]
  })
  .then( orderedDays => {
    if (orderedDays.length) return orderedDays[0].number;
    else return null;
  })
}

module.exports = Day;
