require('dotenv').config();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EVENTTICKETS';

async function insertSampleData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if events already exist
    const count = await Event.countDocuments();
    if (count > 0) {
      console.log('Sample events already exist');
      return;
    }

    const sampleEvents = [
      {
        _id: uuidv4(),
        title: 'Tech Conference 2024',
        description: 'Join us for the biggest tech conference of the year featuring keynotes from industry leaders, hands-on workshops, and networking opportunities.',
        date: '2024-03-15',
        time: '09:00',
        location: 'San Francisco Convention Center',
        address: '747 Howard St, San Francisco, CA 94103',
        category: 'Technology',
        image: 'https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 299,
        capacity: 500,
        availableTickets: 342,
        organizer: {
          _id: uuidv4(),
          name: 'Tech Events Inc.',
          email: 'events@techevents.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Music Festival Summer 2024',
        description: 'Experience an unforgettable weekend of music with top artists performing across multiple stages. Food trucks, art installations, and more.',
        date: '2024-06-20',
        time: '14:00',
        location: 'Central Park',
        address: 'New York, NY 10024',
        category: 'Music',
        image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 89,
        capacity: 1000,
        availableTickets: 750,
        organizer: {
          _id: uuidv4(),
          name: 'Festival Productions',
          email: 'info@festivalprod.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Art & Culture Exhibition',
        description: 'Explore contemporary art from emerging artists around the world. Featuring paintings, sculptures, digital art, and interactive installations.',
        date: '2024-04-10',
        time: '10:00',
        location: 'Modern Art Museum',
        address: '99 Queen St, Melbourne VIC 3000, Australia',
        category: 'Arts',
        image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 25,
        capacity: 200,
        availableTickets: 180,
        organizer: {
          _id: uuidv4(),
          name: 'Cultural Arts Foundation',
          email: 'contact@artsfoundation.org'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Business Networking Summit',
        description: 'Connect with industry professionals, attend workshops on entrepreneurship, and discover new business opportunities.',
        date: '2024-05-08',
        time: '08:30',
        location: 'Grand Hotel Ballroom',
        address: '123 Business Ave, Chicago, IL 60601',
        category: 'Business',
        image: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 150,
        capacity: 300,
        availableTickets: 245,
        organizer: {
          _id: uuidv4(),
          name: 'Business Leaders Network',
          email: 'network@businessleaders.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Yoga & Wellness Retreat',
        description: 'Rejuvenate your mind and body with expert-led yoga sessions, meditation workshops, and healthy cuisine in a serene mountain setting.',
        date: '2024-07-15',
        time: '07:00',
        location: 'Mountain View Resort',
        address: '456 Wellness Way, Aspen, CO 81611',
        category: 'Health',
        image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 450,
        capacity: 50,
        availableTickets: 35,
        organizer: {
          _id: uuidv4(),
          name: 'Wellness Retreats Co.',
          email: 'info@wellnessretreats.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await Event.insertMany(sampleEvents);
    console.log('Sample events inserted successfully');

  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// If this file is run directly, execute the function
if (require.main === module) {
  insertSampleData();
}

module.exports = {
  insertSampleData
};
