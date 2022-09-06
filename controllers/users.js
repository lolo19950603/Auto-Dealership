const User = require("../models/user");
const Car = require("../models/car");
const Ad = require("../models/ad");
let search = {};
let pictures = [];

module.exports = {
  index,
  new: newAd,
  create,
  back,
  resetPictures,
  resetModifyPic,
  resetModel,
  deleteAd,
  modifyPage,
  modify
};

function index(req, res, next) {
  Ad.find({user: req.user._id})
  .then(function(results) {
    res.render('profile/index', {  title: "Profile Page", user: req.user, ads: results});
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
  Car.find(search)
  .then(function(results) {
    res.render('profile/new', { title: "Create Ad", user: req.user, cars: results, search, pictures});
  });
}

function back(req, res, next) {
  pictures = [];
  search = {};
  res.redirect('/profile');
}

function resetPictures(req, res, next) {
  pictures = [];
  res.redirect('/profile/new');
}

function resetModifyPic(req, res, next) {
  pictures = [];
  res.redirect('/profile/' + req.params.id + '/modify');
}

function resetModel(req, res, next) {
  search = {};
  res.redirect('/profile/new');
}

function create(req, res) {
  Car.findOne(search).then(function(car) {
    var newAd = new Ad({
      title: search.year + ' ' + search.make + ' ' + search.model,
      year: search.year,
      make: search.make,
      model: search.model,
      pictures: pictures,
      description: req.body.description,
      price: req.body.price,
      milege: req.body.milege,
      car: car._id,
      user: req.user._id
    });
    newAd.save();
    req.user.personalAds.push(newAd._id);
    req.user.save();
    pictures = [];
    search = {};
    res.redirect('/profile');
  });
}

function deleteAd(req, res, next) {
  Ad.deleteOne({_id: req.params.id})
  .then(function() {
    var deleteLocation = req.user.personalAds.indexOf(req.params.id);
    req.user.personalAds.splice(deleteLocation, 1);
    req.user.save();
    console.log(req.user.personalAds);
    res.redirect('/profile');
  })
}

function modifyPage(req, res, next) {
  Ad.findOne({_id : req.params.id})
  .then(function(ad) {
    res.render('profile/modify', { title: ad.title, user: req.user, ad});
  });
}

function modify(req, res, next) {
  Ad.findOne({_id : req.params.id})
  .then(function(ad) {
    ad.pictures = pictures;
    ad.milege = req.body.milege;
    ad.price = req.body.price;
    ad.description = req.body.description;
    ad.save();
    pictures = [];
    res.redirect('/profile')
  });
}