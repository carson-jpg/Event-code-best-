const express = require('express');
const {
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Order routes
router.get('/', authenticateToken, getAllOrders);
router.get('/user', authenticateToken, getUserOrders);
router.get('/:id', authenticateToken, getOrderById);
router.put('/:id/status', authenticateToken, updateOrderStatus);
router.delete('/:id', authenticateToken, deleteOrder);

module.exports = router;
