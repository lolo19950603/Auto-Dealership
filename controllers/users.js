const User = require('../models/user');

module.exports = {
  index,
  show,
  addFact,
  delFact
};

function index(req, res, next) {
  res.render('autofinder/index', {user: req.user});
}

function show(req, res, next) {
  console.log(req.user, req.query.name);
  res.render('autofinder/show', { user: req.user});
}

function addFact(req, res, next) {
  req.user.facts.push(req.body);
  req.user.save(function(err) {
    res.redirect('/users');
  });
}

function delFact(req, res, next) {

}
