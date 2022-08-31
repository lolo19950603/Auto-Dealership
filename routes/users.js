var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.get('/:id', usersCtrl.show);


module.exports = router;