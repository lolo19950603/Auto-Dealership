// const User = require('../models/user');
const Car = require("../models/car");
const Ad = require("../models/ad");
let search = {};

module.exports = {
  index,
  show,
  reset
};

function index(req, res, next) {
  console.log(req.user);
  if (req.query.year) {
    search.year = req.query.year;
  }
  if (req.query.make) {
    search.make = req.query.make;
  }
  if (req.query.model) {
    search.model = req.query.model;
  }
  const p1 = Car.find(search);
  const p2 = Ad.find(search);
  Promise.all([p1, p2])
  .then(function(results) {
    res.render('ads/index', {title: "Welcome to Autofinder!", user: req.user, cars: results[0], ads: results[1], search});
  })
}

function show(req, res, next) {
  console.log(req.body);
  // res.render('autofinder/show', { user: req.user});
}

function reset(req, res, next) {
  search = {};
  res.redirect('/');
}
