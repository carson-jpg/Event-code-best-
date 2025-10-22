export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'attendee' | 'organizer' | 'admin';
  createdAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  image: string;
  price: number;
  capacity: number;
  availableTickets: number;
  organizer: User;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  _id: string;
  event: Event;
  user: User;
  qrCode: string;
  status: 'valid' | 'used' | 'cancelled';
  purchaseDate: string;
  checkInDate?: string;
}

export interface Order {
  _id: string;
  user: User;
  event: Event;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  tickets: Ticket[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}