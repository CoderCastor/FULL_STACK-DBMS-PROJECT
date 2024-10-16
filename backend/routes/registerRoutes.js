const express = require('express')
const { checkUsername, checkEmail,insertAdmin,checkToken} = require('../controllers/registerController')

const router = express.Router();

router.get('/check-username',checkUsername)
router.get('/check-email',checkEmail)
router.post('/new-admin',insertAdmin)

//teacher and student
router.get('/check-token',checkToken)

module.exports = router;