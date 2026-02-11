export type BookingEmailPayload = {
  name: string;
  email: string;
  notes: string;
  date: string;
  time: string;
  timeZone: string;
};

export async function sendBookingEmail(payload: BookingEmailPayload) {
  const apiBaseUrl = (import.meta.env.VITE_BOOKING_API_URL as string) || 'http://localhost:4000';
  const response = await fetch(`${apiBaseUrl}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Booking request failed: ${response.status} ${message}`);
  }

  return response.json();
}
