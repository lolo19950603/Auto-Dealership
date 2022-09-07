var router = require('express').Router();
var adsCtrl = require('../controllers/ads');

// GET /users
router.get('/', adsCtrl.index);

router.get('/reset', adsCtrl.reset);

router.get('/:id', adsCtrl.show);

router.get('/:id/save', adsCtrl.fav)

router.get('/:id/remove', adsCtrl.removeFav)



function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
