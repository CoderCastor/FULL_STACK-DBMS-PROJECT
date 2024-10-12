const express = require('express');
const {findUserByUsernameAndEmail} = require('../controllers/loginController');

const router = express.Router();

router.post('/',findUserByUsernameAndEmail)


module.exports = router;