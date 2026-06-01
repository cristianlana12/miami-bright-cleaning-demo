import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Booking, BookingStatus } from '../types/booking';

const statusLabels: Record<BookingStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  async function getBookings() {
    setLoading(true);
    setErrorMessage('');

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    setLoading(false);

    if (error) {
      console.error('Supabase select error:', error);
      setErrorMessage('There was an error loading bookings.');
      return;
    }

    setBookings(data || []);
  }

  async function updateBookingStatus(id: string, status: BookingStatus) {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Supabase update error:', error);
      alert('There was an error updating the booking status.');
      return;
    }

    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  }

  useEffect(() => {
    getBookings();
  }, []);

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'pending'
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === 'completed'
  ).length;

  const estimatedRevenue = bookings.reduce((total, booking) => {
    return total + Number(booking.estimated_price || 0);
  }, 0);

  return (
    <main className="admin-page">
      <section className="admin-header">
        <div>
          <span className="eyebrow">Admin dashboard</span>
          <h1>Cleaning bookings</h1>
          <p>
            Manage customer requests, review booking details and update service
            status.
          </p>
        </div>

        <a href="/" className="admin-back-link">
          Back to website
        </a>
      </section>

      <section className="admin-stats">
        <article>
          <span>Total bookings</span>
          <strong>{totalBookings}</strong>
        </article>

        <article>
          <span>Pending</span>
          <strong>{pendingBookings}</strong>
        </article>

        <article>
          <span>Completed</span>
          <strong>{completedBookings}</strong>
        </article>

        <article>
          <span>Estimated revenue</span>
          <strong>${estimatedRevenue}</strong>
        </article>
      </section>

      <section className="admin-card">
        <div className="admin-card-header">
          <h2>Recent requests</h2>
          <button type="button" onClick={getBookings}>
            Refresh
          </button>
        </div>

        {loading && <p className="admin-message">Loading bookings...</p>}

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {!loading && bookings.length === 0 && (
          <p className="admin-message">No bookings found yet.</p>
        )}

        {!loading && bookings.length > 0 && (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <article className="booking-admin-card" key={booking.id}>
                <div className="booking-admin-top">
                  <div>
                    <h3>{booking.full_name}</h3>
                    <p>{booking.email}</p>
                    <p>{booking.phone}</p>
                  </div>

                  <span className={`status-badge status-${booking.status}`}>
                    {statusLabels[booking.status || 'pending']}
                  </span>
                </div>

                <div className="booking-admin-grid">
                  <div>
                    <span>Service</span>
                    <strong>{booking.service_type}</strong>
                  </div>

                  <div>
                    <span>Date</span>
                    <strong>{booking.booking_date}</strong>
                  </div>

                  <div>
                    <span>Time</span>
                    <strong>{booking.booking_time}</strong>
                  </div>

                  <div>
                    <span>Estimate</span>
                    <strong>${booking.estimated_price}</strong>
                  </div>
                </div>

                <div className="booking-admin-address">
                  <span>Address</span>
                  <p>{booking.address}</p>
                </div>

                {booking.message && (
                  <div className="booking-admin-address">
                    <span>Message</span>
                    <p>{booking.message}</p>
                  </div>
                )}

                <div className="booking-actions">
                  <button
                    type="button"
                    onClick={() =>
                      updateBookingStatus(booking.id!, 'confirmed')
                    }
                  >
                    Confirm
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateBookingStatus(booking.id!, 'completed')
                    }
                  >
                    Complete
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      updateBookingStatus(booking.id!, 'cancelled')
                    }
                    className="danger-button"
                  >
                    Cancel
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}