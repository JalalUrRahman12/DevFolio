const express = require('express');
const router = express.Router();
const { getProfile, getAllUsers } = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');

function authorizeRecruiterOrAdmin(req, res, next) {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'recruiter')) {
    return res.status(403).json({ message: 'Forbidden: insufficient role' });
  }
  next();
}

router.get('/profile/:id', authenticateJWT, getProfile);
router.get('/users', authenticateJWT, authorizeRecruiterOrAdmin, getAllUsers);

module.exports = router; 