const testimonials = [
  {
    name: 'Emily R.',
    text: 'The team was on time, professional and left my apartment spotless.',
  },
  {
    name: 'Carlos M.',
    text: 'Great service for my Airbnb. Fast communication and excellent results.',
  },
  {
    name: 'Sophia L.',
    text: 'Booking was easy and the cleaning quality was amazing.',
  },
];

export function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="section-header">
        <span className="eyebrow">Testimonials</span>
        <h2>Trusted by Miami homeowners and businesses</h2>
      </div>

      <div className="cards-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.name}>
            <p>“{testimonial.text}”</p>
            <strong>{testimonial.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}