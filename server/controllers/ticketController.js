const { v4: uuidv4 } = require('uuid');
const Ticket = require('../models/Ticket');
const Order = require('../models/Order');
const Event = require('../models/Event');
const User = require('../models/User');

const registerForEvent = async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableTickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = new Order({
      _id: uuidv4(),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      event: event,
      quantity,
      totalAmount: event.price * quantity,
      status: 'completed',
      tickets: [],
      createdAt: new Date()
    });

    // Create tickets
    for (let i = 0; i < quantity; i++) {
      const qrCode = uuidv4();
      const ticket = new Ticket({
        _id: uuidv4(),
        event: event,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        qrCode,
        status: 'valid',
        purchaseDate: new Date()
      });

      await ticket.save();
      order.tickets.push(ticket);
    }

    // Update event availability
    event.availableTickets -= quantity;
    await event.save();

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserTickets = async (req, res) => {
  try {
    const userTickets = await Ticket.find({ 'user._id': req.user.userId });
    res.json(userTickets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const scanTicket = async (req, res) => {
  try {
    const { qrCode } = req.body;

    const ticket = await Ticket.findOne({ qrCode });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Invalid QR code'
      });
    }

    if (ticket.status === 'used') {
      return res.status(400).json({
        success: false,
        message: 'Ticket already used'
      });
    }

    if (ticket.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Ticket cancelled'
      });
    }

    // Mark ticket as used
    ticket.status = 'used';
    ticket.checkInDate = new Date();

    await ticket.save();

    res.json({
      success: true,
      message: 'Ticket scanned successfully',
      ticket
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerForEvent,
  getUserTickets,
  scanTicket
};
