import { Event, Ticket, Order } from '../types';

class EventService {
  private baseURL = import.meta.env.VITE_API_BASE_URL;

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${this.baseURL}/events`);
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    return response.json();
  }

  async getEvent(id: string): Promise<Event> {
    const response = await fetch(`${this.baseURL}/events/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch event');
    }
    return response.json();
  }

  async createEvent(event: Omit<Event, '_id' | 'organizer' | 'createdAt' | 'updatedAt' | 'availableTickets'>, imageFile?: File): Promise<Event> {
    const formData = new FormData();

    // Add event data to FormData
    Object.entries(event).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/events`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create event');
    }

    return response.json();
  }

  async updateEvent(id: string, event: Partial<Event>, imageFile?: File): Promise<Event> {
    const formData = new FormData();

    // Add event data to FormData
    Object.entries(event).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Add image file if provided
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${this.baseURL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update event');
    }

    return response.json();
  }

  async deleteEvent(id: string): Promise<void> {
    const response = await fetch(`${this.baseURL}/events/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
  }

  async registerForEvent(eventId: string, quantity: number = 1): Promise<Order> {
    const response = await fetch(`${this.baseURL}/events/${eventId}/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register for event');
    }

    return response.json();
  }

  async getUserTickets(): Promise<Ticket[]> {
    const response = await fetch(`${this.baseURL}/tickets`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tickets');
    }

    return response.json();
  }

  async getOrganizerEvents(): Promise<Event[]> {
    const response = await fetch(`${this.baseURL}/events/organizer`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch organizer events');
    }

    return response.json();
  }

  async scanTicket(qrCode: string): Promise<{ success: boolean; message: string; ticket?: Ticket }> {
    const response = await fetch(`${this.baseURL}/tickets/scan`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ qrCode }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to scan ticket');
    }

    return response.json();
  }
}

export const eventService = new EventService();