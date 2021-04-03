const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);
router.get('/me', usersController.getMe);
router.get('/:userId', usersController.getUser);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.setAvatar);

module.exports = router;
