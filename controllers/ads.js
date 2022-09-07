// const User = require('../models/user');
const Car = require("../models/car");
const Ad = require("../models/ad");
let search = {};

module.exports = {
  index,
  show,
  reset,
  fav,
  removeFav
};

function index(req, res, next) {
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
  Ad.findOne({_id: req.params.id})
  .then(function(ad) {
    res.render('ads/show', { title: ad.title, user: req.user, ad});
  });
}

function reset(req, res, next) {
  search = {};
  res.redirect('/');
}

function fav(req, res, next) {
  Ad.findOne({_id: req.params.id})
  .then(function(ad) {
    ad.savedBy.push(req.user._id);
    ad.save();
    res.redirect('/ads/' + req.params.id);
  })
}

function removeFav(req, res, next) {
  Ad.findOne({_id: req.params.id})
  .then(function(ad) {
    let removeIndex = ad.savedBy.indexOf(req.user._id);
    ad.savedBy.splice(removeIndex, 1);
    ad.save();
    res.redirect('/profile/favorite');
  })
}
