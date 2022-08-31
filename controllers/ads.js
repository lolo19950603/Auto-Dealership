// const User = require('../models/user');
const Car = require("../models/car");
let search = {};

module.exports = {
  index,
  show,
  reset,
  addFact,
  delFact
};

function index(req, res, next) {
  if (req.query.year) {
    search.year = req.query.year;
    delete search.make;
    delete search.model;
  }
  if (req.query.make) {
    search.make = req.query.make;
  }
  if (req.query.model) {
    search.model = req.query.model;
  }
  Car.find(search)
  .then(function (cars) {
    console.log(cars)
    res.render('autofinder/index', {user: req.user, cars, search});
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

function addFact(req, res, next) {
  req.user.facts.push(req.body);
  req.user.save(function(err) {
    res.redirect('/users');
  });
}

function delFact(req, res, next) {

}
