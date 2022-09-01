var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.post('/:id', usersCtrl.create);

router.get('/:id/new/resetpictures', usersCtrl.resetPictures);

router.get('/:id/new/resetmodel', usersCtrl.resetModel);

router.get('/:id/new', usersCtrl.new)

router.get('/:id', usersCtrl.show);




module.exports = router;