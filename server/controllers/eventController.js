const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');
const User = require('../models/User');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createEvent = async (req, res) => {
  try {
    if (req.user.role !== 'organizer' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only organizers and admins can create events' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const event = new Event({
      _id: uuidv4(),
      ...req.body,
      image: imagePath,
      availableTickets: req.body.capacity,
      organizer: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (req.user.role !== 'admin' && event.organizer._id !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : event.image;

    const oldCapacity = event.capacity;
    Object.assign(event, req.body);
    if (req.file) {
      event.image = imagePath;
    }
    event.updatedAt = new Date();

    // Handle availableTickets when capacity changes
    if (req.body.capacity !== undefined && req.body.capacity !== oldCapacity) {
      const soldTickets = oldCapacity - event.availableTickets;
      event.availableTickets = Math.max(0, req.body.capacity - soldTickets);
    }

    await event.save();
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (req.user.role !== 'admin' && event.organizer._id !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.remove();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrganizerEvents = async (req, res) => {
  try {
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ message: 'Only organizers can access this endpoint' });
    }

    const organizerEvents = await Event.find({ 'organizer._id': req.user.userId });
    res.json(organizerEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getOrganizerEvents
};
