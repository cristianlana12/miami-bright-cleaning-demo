
export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="eyebrow">Miami Bright Cleaning</span>

        <h1>Premium cleaning services for homes and businesses in Miami.</h1>

        <p>
          Reliable residential and commercial cleaning services with flexible
          scheduling, transparent pricing and trusted local cleaners.
        </p>

        <div className="hero-actions">
          <a href="#booking" className="btn-primary">
            Book a Cleaning
          </a>

          <a href="#services" className="btn-secondary">
            View Services
          </a>
        </div>
      </div>

      <div className="hero-card">
        <div className="hero-card-top">
          <span>Today</span>
          <strong>12 cleanings booked</strong>
        </div>

        <div className="hero-stat">
          <span>Customer rating</span>
          <strong>4.9/5</strong>
        </div>

        <div className="hero-stat">
          <span>Response time</span>
          <strong>Under 15 min</strong>
        </div>

        <div className="hero-stat">
          <span>Service area</span>
          <strong>Miami, FL</strong>
        </div>
      </div>
    </section>
  );
}