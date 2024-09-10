const express = require('express');
const { adminLogin, verifyToken, createAlumni, getAllAlumni, updateAlumni, deleteAlumni } = require('../controllers/adminController');

const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

// Alumni management routes (protected)
router.post('/alumni', verifyToken, createAlumni); // Create alumni
router.get('/alumni', getAllAlumni); // Get all alumni
router.put('/alumni/:id', verifyToken, updateAlumni); // Update alumni
router.delete('/alumni/:id', verifyToken, deleteAlumni); // Delete alumni

module.exports = router;
