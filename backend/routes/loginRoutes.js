const express = require('express');
const {findUserByUsername,checkPassword} = require('../controllers/loginController');

const router = express.Router();

router.post('/',findUserByUsername)

router.post('/check-password',checkPassword)


module.exports = router;