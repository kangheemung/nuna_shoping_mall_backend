//user api
const express = require('express');
const router = express.Router();
// Update the import statement to correctly match the UserController.js file
const userController = require('../controllers/user.controller');

//회원가입

router.post('/', userController.createUser);

module.exports = router;
