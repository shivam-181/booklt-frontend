import { Experience, Slot, Booking } from "@/lib/types";
// Get the Backend URL from environment variables, with a fallback
// This is crucial for deployment!
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

/**
 * Fetches all experiences from the backend.
 * We'll add error handling here.
 */
export async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch(`${API_URL}/experiences`);

    // If the response is not OK, throw an error
    if (!res.ok) {
      throw new Error("Failed to fetch experiences");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getExperiences:", error);
    // In a real app, you might return a special error object
    // For this project, we'll re-throw to let the page handle it
    throw new Error("Could not fetch data from the server.");
  }
}
export async function getExperienceById(id: string): Promise<Experience> {
  try {
    const res = await fetch(`${API_URL}/experiences/${id}`);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Experience not found");
      }
      throw new Error("Failed to fetch experience");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getExperienceById:", error);
    // Re-throw the error to be handled by the page
    throw error;
  }
}
// ... your getExperiences and getExperienceById functions ...

/**
 * Validates a promo code against the backend.
 */
export async function validatePromoCode(promoCode: string): Promise<{
  isValid: boolean;
  discountType?: "percent" | "flat";
  value?: number;
  message?: string;
}> {
  const res = await fetch(`${API_URL}/promo/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ promoCode }),
  });

  return res.json();
}

/**
 * Submits a new booking to the backend.
 */
export async function createBooking(bookingData: {
  experienceId: string;
  slotDate: string;
  userName: string;
  userEmail: string;
  promoCode: string | null;
  finalPrice: number;
}): Promise<{
  message: string;
  booking: any;
}> {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    // Try to parse the error message from the backend
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to create booking");
  }

  return res.json();
}
