const { v4: uuidv4 } = require('uuid');
const Event = require('../models/Event');

const initializeSampleEvents = async () => {
  const count = await Event.countDocuments();
  if (count === 0) {
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
        capacity: 2000,
        availableTickets: 1456,
        organizer: {
          _id: uuidv4(),
          name: 'Music Fest Organizers',
          email: 'info@musicfest.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Startup Networking Event',
        description: 'Connect with fellow entrepreneurs, investors, and industry professionals. Perfect for startups looking to expand their network.',
        date: '2024-02-28',
        time: '18:00',
        location: 'Innovation Hub',
        address: '123 Innovation Dr, Austin, TX 78701',
        category: 'Business',
        image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 0,
        capacity: 150,
        availableTickets: 87,
        organizer: {
          _id: uuidv4(),
          name: 'Austin Startup Community',
          email: 'hello@austinstartups.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Food & Wine Festival',
        description: 'Indulge in gourmet food and premium wines from local restaurants and wineries. Live cooking demonstrations and tastings.',
        date: '2024-04-12',
        time: '12:00',
        location: 'Waterfront Plaza',
        address: '456 Harbor Blvd, Seattle, WA 98101',
        category: 'Food',
        image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 65,
        capacity: 300,
        availableTickets: 178,
        organizer: {
          _id: uuidv4(),
          name: 'Culinary Events LLC',
          email: 'contact@culinaryevents.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Art Gallery Opening',
        description: 'Exclusive opening night for our new contemporary art exhibition featuring works from emerging local artists.',
        date: '2024-03-08',
        time: '19:00',
        location: 'Modern Art Gallery',
        address: '789 Art St, Chicago, IL 60614',
        category: 'Arts',
        image: 'https://images.pexels.com/photos/1652340/pexels-photo-1652340.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 25,
        capacity: 100,
        availableTickets: 45,
        organizer: {
          _id: uuidv4(),
          name: 'Modern Art Gallery',
          email: 'info@modernartgallery.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: uuidv4(),
        title: 'Fitness Bootcamp Weekend',
        description: 'Intensive weekend fitness bootcamp with professional trainers. All fitness levels welcome. Includes meals and equipment.',
        date: '2024-05-18',
        time: '08:00',
        location: 'Fitness Center Pro',
        address: '321 Fitness Ave, Los Angeles, CA 90210',
        category: 'Sports',
        image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800',
        price: 150,
        capacity: 50,
        availableTickets: 23,
        organizer: {
          _id: uuidv4(),
          name: 'FitLife Training',
          email: 'info@fitlifetraining.com'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await Event.insertMany(sampleEvents);
    console.log('Sample events inserted');
  }
};

module.exports = {
  initializeSampleEvents
};
