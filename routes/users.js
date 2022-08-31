var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.post('/', usersCtrl.create);

router.get('/:id/new/reset', usersCtrl.reset);

router.get('/:id/new', usersCtrl.new)

router.get('/:id', usersCtrl.show);




module.exports = router;