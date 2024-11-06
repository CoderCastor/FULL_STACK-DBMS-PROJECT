const express = require('express') 
const {addSubject,getSubjectsData,deleteSubject,insertToken,availTokens,getTeachers} = require('../controllers/adminController')

const router = express.Router();

// router.get('/dashboard',getAdminDashboard)
router.get('/subjects',getSubjectsData)
router.post('/add-subject',addSubject)
router.post('/delete-subject',deleteSubject)

router.post('/insert-token',insertToken)
router.get('/avail-tokens',availTokens)
router.get('/get-teachers',getTeachers)




module.exports = router;