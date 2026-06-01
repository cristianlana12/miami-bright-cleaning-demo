import type { Booking, BookingStatus } from '../types/booking';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function createBooking(booking: Booking) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Create booking API error:', errorData);
    throw new Error('Could not create booking');
  }

  return response.json();
}

export async function getBookings() {
  const response = await fetch(`${API_URL}/bookings`);

  if (!response.ok) {
    throw new Error('Could not load bookings');
  }

  return response.json();
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus
) {
  const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Could not update booking status');
  }

  return response.json();
}