const express = require('express');
const { registerForEvent, getUserTickets, scanTicket } = require('../controllers/ticketController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Ticket routes
router.post('/events/:id/register', authenticateToken, registerForEvent);
router.get('/', authenticateToken, getUserTickets);
router.post('/scan', authenticateToken, scanTicket);

module.exports = router;
