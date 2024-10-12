const express = require('express')
const { checkUsername, checkEmail,insertAdmin} = require('../controllers/registerController')

const router = express.Router();

router.get('/check-username',checkUsername)
router.get('/check-email',checkEmail)
router.post('/new-admin',insertAdmin)

module.exports = router;