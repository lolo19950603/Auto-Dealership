const User = require("../models/user");
const Car = require("../models/car");
const Ad = require("../models/ad");
let search = {};
let pictures = [];

module.exports = {
  show,
  new: newAd,
  create,
  back,
  resetPictures,
  resetModel
};

function show(req, res, next) {
  const p1 = Ad.find({_id: req.params.id});
  const p2 = User.findOne({_id: req.params.id});
  User.findOne({_id: req.params.id}).then(function(result) {
    console.log(result);
    res.render('users/show', { title: "Profile Page", user: result});
  });
}

function newAd(req, res, next) {
  if (req.query.picture) {
    pictures.push(req.query.picture)
  }
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
  const p2 = User.findOne({_id: req.params.id});
  Promise.all([p1, p2])
  .then(function(results) {
    res.render('users/new', { title: "Create Ad", user: results[1], cars: results[0], search, pictures});
  })
}

function back(req, res, next) {
  pictures = [];
  search = {};
  res.redirect('/users/' + req.params.id);
}

function resetPictures(req, res, next) {
  pictures = [];
  res.redirect('/users/' + req.params.id + '/new');
}

function resetModel(req, res, next) {
  search = {};
  res.redirect('/users/' + req.params.id + '/new');
}

function create(req, res) {
  Car.findOne(search).then(function(car) {
    var newAd = new Ad({
      title: search.year + ' ' + search.make + ' ' + search.model,
      pictures: pictures,
      description: req.body.description,
      milege: req.body.milege,
      car: car._id,
      user: req.params.id
    });
    newAd.save();
    return Promise.all([
      User.findOne({_id: req.params.id}),
      newAd
    ]);
  })
  .then(function(result) {
    const user = result[0];
    const newAdId = result[1]._id;
    user.personalAds.push(newAdId);
    user.save();
    res.redirect('/users/' + req.params.id);
  });
}