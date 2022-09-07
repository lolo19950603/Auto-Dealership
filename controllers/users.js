const User = require("../models/user");
const Car = require("../models/car");
const Ad = require("../models/ad");
let search = {};

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
  modify,
  favorite
};

function index(req, res, next) {
  Ad.find({user: req.user._id})
  .then(function(results) {
    res.render('profile/index', {  title: "Profile Page", user: req.user, ads: results});
  });
}

function newAd(req, res, next) {
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
    res.render('profile/new', { title: "Create Ad", user: req.user, cars: results, search});
  });
}

function back(req, res, next) {
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
    let pictures = []
    if (req.body.picture1) {
      pictures.push(req.body.picture1);
    }
    if (req.body.picture2) {
      pictures.push(req.body.picture2);
    }
    if (req.body.picture3) {
      pictures.push(req.body.picture3);
    }
    if (req.body.picture4) {
      pictures.push(req.body.picture4);
    }
    if (req.body.picture5) {
      pictures.push(req.body.picture5);
    }
    console.log(pictures);
    var newAd = new Ad({
      title: search.year + ' ' + search.make + ' ' + search.model,
      year: search.year,
      make: search.make,
      model: search.model,
      pictures: pictures,
      description: req.body.description,
      price: req.body.price,
      milege: req.body.milege,
      user: req.user._id,
      contact: {
        name: req.body.name,
        phone: req.body.phone,
        postal: req.body.postal
      }
    });
    newAd.save();
    console.log(newAd);
    search = {};
    res.redirect('/profile');
  });
}

function deleteAd(req, res, next) {
  Ad.deleteOne({_id: req.params.id})
  .then(function(result) {
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
    let pictures = []
    if (req.body.picture1) {
      pictures.push(req.body.picture1);
    }
    if (req.body.picture2) {
      pictures.push(req.body.picture2);
    }
    if (req.body.picture3) {
      pictures.push(req.body.picture3);
    }
    if (req.body.picture4) {
      pictures.push(req.body.picture4);
    }
    if (req.body.picture5) {
      pictures.push(req.body.picture5);
    }
    console.log(pictures);
    ad.pictures = pictures;
    ad.milege = req.body.milege;
    ad.price = req.body.price;
    ad.description = req.body.description;
    ad.contact = {
      name: req.body.name,
      phone: req.body.phone,
      postal: req.body.postal
    };
    ad.save();
    res.redirect('/profile')
  });
}

function favorite(req, res, next) {
  Ad.find({ savedBy: req.user._id  })
  .then(function(results) {
    res.render('profile/favorite', {  title: "Favorite", user: req.user, favAds: results});
  });
}