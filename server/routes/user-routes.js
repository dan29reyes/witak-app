const express = require('express')
const router = express.Router();

const userController = require('../controllers/users-controllers');

router.post('/register',userController.register);
router.post('/login', userController.login)
router.post('/forgot-password', userController.forgot)

module.exports = router;