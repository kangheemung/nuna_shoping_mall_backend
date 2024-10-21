//user api
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//회원가입
// router.post('/login');
router.post('/', userController.createUser);

module.exports = router;
