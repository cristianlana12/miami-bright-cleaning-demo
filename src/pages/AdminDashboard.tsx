import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Booking, BookingStatus, ServiceType } from '../types/booking';
import {
    getBookings as fetchBookings,
    updateBookingStatus as updateBookingStatusRequest,
} from '../lib/api';

type StatusFilter = 'all' | BookingStatus;

const statusLabels: Record<BookingStatus, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

const serviceLabels: Record<ServiceType, string> = {
    house_cleaning: 'House Cleaning',
    deep_cleaning: 'Deep Cleaning',
    office_cleaning: 'Office Cleaning',
    move_in_out: 'Move In / Move Out',
    airbnb_cleaning: 'Airbnb Cleaning',
    post_construction: 'Post Construction',
};

const filters: StatusFilter[] = [
    'all',
    'pending',
    'confirmed',
    'completed',
    'cancelled',
];

export function AdminDashboard() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<StatusFilter>('all');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    async function getBookings() {
        setLoading(true);
        setErrorMessage('');

        try {
            const data = await fetchBookings();
            setBookings(data || []);
        } catch (error) {
            console.error('Load bookings error:', error);
            setErrorMessage('There was an error loading bookings.');
        } finally {
            setLoading(false);
        }
    }

    async function updateBookingStatus(id: string, status: BookingStatus) {
        try {
            const updatedBooking = await updateBookingStatusRequest(id, status);

            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking.id === id ? updatedBooking : booking
                )
            );
        } catch (error) {
            console.error('Update booking error:', error);
            alert('There was an error updating the booking status.');
        }
    }

    async function handleLogout() {
        await supabase.auth.signOut();
        navigate('/admin/login');
    }

    useEffect(() => {
        getBookings();
    }, []);

    const filteredBookings = useMemo(() => {
        if (selectedFilter === 'all') {
            return bookings;
        }

        return bookings.filter((booking) => booking.status === selectedFilter);
    }, [bookings, selectedFilter]);

    const totalBookings = bookings.length;

    const pendingBookings = bookings.filter(
        (booking) => booking.status === 'pending'
    ).length;

    const confirmedBookings = bookings.filter(
        (booking) => booking.status === 'confirmed'
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
                        status from one modern dashboard.
                    </p>
                </div>

                <div className="admin-header-actions">
                    <a href="/" className="admin-back-link">
                        Back to website
                    </a>

                    <button type="button" onClick={handleLogout} className="admin-logout-button">
                        Logout
                    </button>
                </div>
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
                    <span>Confirmed</span>
                    <strong>{confirmedBookings}</strong>
                </article>

                <article>
                    <span>Estimated revenue</span>
                    <strong>${estimatedRevenue}</strong>
                </article>
            </section>

            <section className="admin-card">
                <div className="admin-card-header">
                    <div>
                        <h2>Recent requests</h2>
                        <p>{filteredBookings.length} bookings displayed</p>
                    </div>

                    <button type="button" onClick={getBookings}>
                        Refresh
                    </button>
                </div>

                <div className="admin-filters">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            className={selectedFilter === filter ? 'filter-active' : ''}
                            onClick={() => setSelectedFilter(filter)}
                        >
                            {filter === 'all' ? 'All' : statusLabels[filter]}
                        </button>
                    ))}
                </div>

                {loading && <p className="admin-message">Loading bookings...</p>}

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {!loading && filteredBookings.length === 0 && (
                    <p className="admin-message">No bookings found for this filter.</p>
                )}

                {!loading && filteredBookings.length > 0 && (
                    <div className="bookings-list">
                        {filteredBookings.map((booking) => {
                            const status = booking.status || 'pending';
                            const serviceType = booking.service_type as ServiceType;

                            return (
                                <article className="booking-admin-card" key={booking.id}>
                                    <div className="booking-admin-top">
                                        <div>
                                            <h3>{booking.full_name}</h3>
                                            <p>{booking.email}</p>
                                            <p>{booking.phone}</p>
                                        </div>

                                        <span className={`status-badge status-${status}`}>
                                            {statusLabels[status]}
                                        </span>
                                    </div>

                                    <div className="booking-admin-grid">
                                        <div>
                                            <span>Service</span>
                                            <strong>{serviceLabels[serviceType]}</strong>
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
                                            onClick={() => updateBookingStatus(booking.id!, 'confirmed')}
                                        >
                                            Confirm
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => updateBookingStatus(booking.id!, 'completed')}
                                        >
                                            Complete
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => updateBookingStatus(booking.id!, 'cancelled')}
                                            className="danger-button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}