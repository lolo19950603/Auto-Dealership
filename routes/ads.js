var router = require('express').Router();
var adsCtrl = require('../controllers/ads');

// GET /users
router.get('/', adsCtrl.index);

router.get('/reset', adsCtrl.reset);

// router.post('/ads', adsCtrl.show);

// POST /facts
// We will already have access to the logged in student on
// the server, therefore do not use: /users/:id/facts
router.post('/facts', isLoggedIn, adsCtrl.addFact);

// DELETE /facts/:id
router.delete('/facts/:id', adsCtrl.delFact);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
