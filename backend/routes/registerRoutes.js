const express = require('express')
const { checkUsername, checkEmail,insertAdmin,checkToken,insertTeacher,checkTokenSTD,insertStudent} = require('../controllers/registerController')

const router = express.Router();

router.get('/check-username',checkUsername)
router.get('/check-email',checkEmail)
router.post('/new-admin',insertAdmin)
router.post('/new-teacher',insertTeacher)
router.post('/new-student',insertStudent)

//teacher and student
router.get('/check-token',checkToken)
router.get('/check-tokenstd',checkTokenSTD)

module.exports = router;