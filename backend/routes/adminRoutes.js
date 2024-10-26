const express = require('express') 
const {addSubject,getSubjectsData,deleteSubject} = require('../controllers/adminController')

const router = express.Router();

// router.get('/dashboard',getAdminDashboard)
router.get('/subjects',getSubjectsData)
router.post('/add-subject',addSubject)
router.post('/delete-subject',deleteSubject)

module.exports = router;