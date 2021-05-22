const router = require('express').Router();

const userController = require('./user.controller');

router.get('/', userController.getUsers);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/logout', userController.logout);

router.get('/token', userController.token);

module.exports = router;
