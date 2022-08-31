const User = require("../models/user");
const Car = require("../models/car");
const Ad = require("../models/ad");
let search = {};

module.exports = {
  show,
  new: newAd,
  create,
  reset
};

function show(req, res, next) {
  const p1 = Ad.find({_id: req.params.id});
  const p2 = User.find({_id: req.params.id});

  User.find({_id: req.params.id}).then(function(result) {
    res.render('users/show', { title: "Profile Page", user: result[0]});
  });
}

function newAd(req, res, next) {
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
  const p1 = Car.find(search);
  const p2 = User.find({_id: req.params.id});
  Promise.all([p1, p2])
  .then(function(results) {
    res.render('users/new', { title: "Create Ad", user: results[1][0], cars: results[0], search});
  })
}

function reset(req, res, next) {
  search = {};
  console.log('/users/' + req.params.id + '/new');
  res.redirect('/users/' + req.params.id + '/new');
}

function create(req, res) {
  console.log(req.body, search);
}