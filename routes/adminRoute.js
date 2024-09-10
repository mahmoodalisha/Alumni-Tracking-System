const express = require('express');
const { adminLogin, verifyToken, createAlumni, getAllAlumni, updateAlumni, deleteAlumni } = require('../controllers/adminController');

const router = express.Router();


router.post('/login', adminLogin);


router.post('/alumni', verifyToken, createAlumni); 
router.get('/alumni', getAllAlumni); 
router.put('/alumni/:id', verifyToken, updateAlumni); 
router.delete('/alumni/:id', verifyToken, deleteAlumni); 

module.exports = router;
