// lib/types.ts

// This defines the shape of a single Slot
export interface Slot {
  _id: string;
  date: string;
  availableSpots: number;
}

// --- THIS IS THE MISSING PIECE ---
// This defines the shape of a single Experience
export interface Experience {
  _id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  slots: Slot[]; // <-- It uses the Slot interface
  createdAt: string;
  updatedAt: string;
}
// ---------------------------------

// This defines the shape of a single Booking
export interface Booking {
  _id: string;
  experience: string; // This will be the Experience ID
  userName: string;
  userEmail: string;
  slotDate: string;
  status: "confirmed" | "pending" | "cancelled";
  promoCode?: string | null;
  finalPrice: number;
  createdAt: string;
  updatedAt: string;
}
