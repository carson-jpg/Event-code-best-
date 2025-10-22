const express = require('express');
const { register, login, verify } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/verify', authenticateToken, verify);

module.exports = router;
