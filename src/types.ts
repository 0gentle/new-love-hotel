/**
 * Shared types for the New Love International Hotel digital experience
 */

export interface Suite {
  id: "standard" | "deluxe" | "executive";
  tier: string;
  name: string;
  priceNumeric: number;
  priceFormatted: string;
  description: string;
  features: string[];
  image: string;
  elevation: string;
}

export interface Booking {
  id: string;
  suiteId: "standard" | "deluxe" | "executive";
  suiteName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  totalPrice: number;
  createdAt: string;
}

export interface WellnessClass {
  id: string;
  name: string;
  time: string;
  day: string;
  coach: string;
  category: "yoga" | "strength" | "mindfulness" | "cardio";
  description: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface SavedInquiry {
  id: string;
  fullName: string;
  email: string;
  eventType: string;
  expectedGuests: number;
  message: string;
  createdAt: string;
  status: "pending" | "reviewed";
}
