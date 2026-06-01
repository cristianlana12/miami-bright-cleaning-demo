import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Booking, ServiceType } from '../types/booking';

const initialForm: Booking = {
  full_name: '',
  email: '',
  phone: '',
  service_type: 'house_cleaning',
  booking_date: '',
  booking_time: '',
  address: '',
  message: '',
};

const estimatedPrices: Record<ServiceType, number> = {
  house_cleaning: 99,
  deep_cleaning: 189,
  office_cleaning: 149,
  move_in_out: 229,
  airbnb_cleaning: 129,
  post_construction: 279,
};

export function BookingForm() {
  const [form, setForm] = useState<Booking>(initialForm);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const bookingToInsert = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      service_type: form.service_type,
      booking_date: form.booking_date,
      booking_time: form.booking_time,
      address: form.address.trim(),
      message: form.message?.trim() || null,
      status: 'pending',
      estimated_price: estimatedPrices[form.service_type],
    };

    const { error } = await supabase.from('bookings').insert([bookingToInsert]);

    setLoading(false);

    if (error) {
      console.error('Supabase insert error:', error);
      setErrorMessage('There was an error creating your booking. Please try again.');
      return;
    }

    setSuccessMessage('Your cleaning request was sent successfully!');
    setForm(initialForm);
  }

  return (
    <section className="booking-section" id="booking">
      <div className="section-header">
        <span className="eyebrow">Book online</span>
        <h2>Schedule your cleaning in minutes</h2>
        <p>
          Tell us what you need and our team will contact you to confirm your
          appointment.
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full name
            <input
              type="text"
              name="full_name"
              value={form.full_name}
              onChange={handleChange}
              required
              minLength={3}
              placeholder="Emily Johnson"
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="emily@email.com"
            />
          </label>

          <label>
            Phone
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              minLength={7}
              placeholder="+1 305 555 1234"
            />
          </label>

          <label>
            Service
            <select
              name="service_type"
              value={form.service_type}
              onChange={handleChange}
              required
            >
              <option value="house_cleaning">House Cleaning - from $99</option>
              <option value="deep_cleaning">Deep Cleaning - from $189</option>
              <option value="office_cleaning">Office Cleaning - from $149</option>
              <option value="move_in_out">Move In / Move Out - from $229</option>
              <option value="airbnb_cleaning">Airbnb Cleaning - from $129</option>
              <option value="post_construction">Post Construction - from $279</option>
            </select>
          </label>

          <label>
            Date
            <input
              type="date"
              name="booking_date"
              value={form.booking_date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time
            <input
              type="time"
              name="booking_time"
              value={form.booking_time}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Address
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            minLength={5}
            placeholder="Brickell, Miami, FL"
          />
        </label>

        <label>
          Additional details
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about the size of your home, special requests, pets, parking instructions, etc."
            rows={5}
          />
        </label>

        <div className="booking-summary">
          <span>Estimated starting price</span>
          <strong>${estimatedPrices[form.service_type]}</strong>
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Sending request...' : 'Request Cleaning'}
        </button>
      </form>
    </section>
  );
}