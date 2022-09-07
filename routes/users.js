var router = require('express').Router();
var usersCtrl = require('../controllers/users');

// GET /users
router.post('/', usersCtrl.create);

router.get('/new/back', usersCtrl.back);

router.get('/new/resetpictures', usersCtrl.resetPictures);

router.get('/new/resetmodel', usersCtrl.resetModel);

router.get('/new', usersCtrl.new)

router.get('/', usersCtrl.index);

router.get('/favorite', usersCtrl.favorite);

router.get('/:id/delete', usersCtrl.deleteAd);

router.get('/:id/modify', usersCtrl.modifyPage);

router.post('/:id', usersCtrl.modify);

module.exports = router;