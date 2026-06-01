const services = [
  {
    icon: '🏠',
    title: 'House Cleaning',
    description: 'Regular cleaning for apartments, condos and family homes.',
  },
  {
    icon: '✨',
    title: 'Deep Cleaning',
    description: 'A detailed top-to-bottom cleaning for a fresh and spotless space.',
  },
  {
    icon: '🏢',
    title: 'Office Cleaning',
    description: 'Professional cleaning for offices, studios and commercial spaces.',
  },
  {
    icon: '📦',
    title: 'Move In / Move Out',
    description: 'Cleaning services before moving in or after moving out.',
  },
  {
    icon: '🔑',
    title: 'Airbnb Cleaning',
    description: 'Fast turnover cleaning for short-term rental properties.',
  },
  {
    icon: '🧰',
    title: 'Post Construction',
    description: 'Detailed cleaning after renovation, remodeling or construction work.',
  },
];

export function Services() {
  return (
    <section className="section" id="services">
      <div className="section-header">
        <span className="eyebrow">Our services</span>
        <h2>Cleaning solutions for every space</h2>
        <p>
          From regular home cleaning to deep cleaning, offices, Airbnb turnovers
          and post-construction cleaning.
        </p>
      </div>

      <div className="cards-grid">
        {services.map((service) => (
          <article className="service-card" key={service.title}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}