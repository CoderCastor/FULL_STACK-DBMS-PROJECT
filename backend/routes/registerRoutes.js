const express = require('express')
const { checkUsername, checkEmail,insertAdmin,checkToken,insertTeacher} = require('../controllers/registerController')

const router = express.Router();

router.get('/check-username',checkUsername)
router.get('/check-email',checkEmail)
router.post('/new-admin',insertAdmin)
router.post('/new-teacher',insertTeacher)

//teacher and student
router.get('/check-token',checkToken)

module.exports = router;