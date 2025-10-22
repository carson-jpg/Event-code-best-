const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getOrganizerEvents
} = require('../controllers/eventController');
const { registerForEvent } = require('../controllers/ticketController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Event routes
router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', authenticateToken, upload.single('image'), createEvent);
router.put('/:id', authenticateToken, upload.single('image'), updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);
router.get('/organizer', authenticateToken, getOrganizerEvents);
router.post('/:id/register', authenticateToken, registerForEvent);

module.exports = router;
