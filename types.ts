
export interface Bus {
  id: string;
  operatorName: string;
  type: 'AC Sleeper' | 'Non-AC Sleeper' | 'AC Seater' | 'Non-AC Seater';
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  rating: number;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface SearchQuery {
  from: string;
  to: string;
  date: string;
}

export interface Seat {
  id: string;
  row: number;
  col: number;
  isAvailable: boolean;
  price: number;
  type: 'lower' | 'upper';
}

export interface BookingDetails {
  id: string;
  bus: Bus;
  selectedSeats: string[];
  totalAmount: number;
  bookingDate: string;
  passengerName: string;
  pnr: string;
}

export type BookingStep = 'searching' | 'selecting' | 'payment' | 'ticket';
export type ViewType = 'home' | 'bookings' | 'support' | 'track' | 'profile';
