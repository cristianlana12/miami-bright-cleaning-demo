const benefits = [
  {
    number: '01',
    title: 'Trusted local cleaners',
    description:
      'Our team is trained, reliable and focused on delivering a premium cleaning experience.',
  },
  {
    number: '02',
    title: 'Flexible scheduling',
    description:
      'Customers can request the day and time that best fits their home, office or rental property.',
  },
  {
    number: '03',
    title: 'Transparent pricing',
    description:
      'Clear starting prices and final confirmation before every cleaning appointment.',
  },
  {
    number: '04',
    title: 'Fast response',
    description:
      'Every booking request is received instantly so the business can respond faster.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section why-section" id="why-us">
      <div className="section-header">
        <span className="eyebrow">Why choose us</span>
        <h2>A modern cleaning experience from booking to service</h2>
        <p>
          This demo shows how a local cleaning company can look premium,
          receive online bookings and organize new customer requests.
        </p>
      </div>

      <div className="why-grid">
        {benefits.map((benefit) => (
          <article className="why-card" key={benefit.title}>
            <span>{benefit.number}</span>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}