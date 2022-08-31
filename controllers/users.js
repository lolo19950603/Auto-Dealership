// const User = require('../models/user');
const User = require("../models/user");

module.exports = {
  show
};

function show(req, res, next) {
    User.find({googleId: req.params.id}).then(function(result) {
      res.render('autofinder/users/show', { user: result[0]});
    });
}