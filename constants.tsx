
import React from 'react';
import { Bus as BusIcon, Wifi, Coffee, Battery, Shield, Star, Clock, MapPin } from 'lucide-react';
import { Bus } from './types';

export const MOCK_BUSES: Bus[] = [
  {
    id: '1',
    operatorName: 'VRL Travels',
    type: 'AC Sleeper',
    departureTime: '21:00',
    arrivalTime: '06:30',
    duration: '9h 30m',
    price: 1250,
    rating: 4.5,
    availableSeats: 12,
    totalSeats: 36,
    amenities: ['Wifi', 'Water Bottle', 'Charging Point', 'Blanket']
  },
  {
    id: '2',
    operatorName: 'Zingbus Premium',
    type: 'AC Seater',
    departureTime: '08:00',
    arrivalTime: '15:00',
    duration: '7h 00m',
    price: 850,
    rating: 4.2,
    availableSeats: 24,
    totalSeats: 45,
    amenities: ['Wifi', 'Movie', 'Charging Point']
  },
  {
    id: '3',
    operatorName: 'Orange Travels',
    type: 'Non-AC Sleeper',
    departureTime: '22:30',
    arrivalTime: '08:00',
    duration: '9h 30m',
    price: 950,
    rating: 3.8,
    availableSeats: 8,
    totalSeats: 30,
    amenities: ['Charging Point', 'Blanket']
  },
  {
    id: '4',
    operatorName: 'IntrCity SmartBus',
    type: 'AC Sleeper',
    departureTime: '19:45',
    arrivalTime: '05:15',
    duration: '9h 30m',
    price: 1400,
    rating: 4.8,
    availableSeats: 5,
    totalSeats: 32,
    amenities: ['Wifi', 'Snacks', 'Water Bottle', 'Charging Point', 'Blanket', 'Pillow']
  }
];

export const AMENITY_ICONS: Record<string, React.ReactNode> = {
  'Wifi': <Wifi className="w-4 h-4" />,
  'Water Bottle': <Coffee className="w-4 h-4" />,
  'Charging Point': <Battery className="w-4 h-4" />,
  'Blanket': <Shield className="w-4 h-4" />,
  'Snacks': <Coffee className="w-4 h-4" />,
  'Pillow': <Shield className="w-4 h-4" />,
  'Movie': <BusIcon className="w-4 h-4" />
};

export const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kochi", "Chandigarh", "Indore", "Bhopal", "Visakhapatnam", "Surat", "Patna", "Nagpur", "Dehradun", "Ranchi"
];
