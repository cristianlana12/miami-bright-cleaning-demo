const plans = [
  {
    name: 'Basic Cleaning',
    price: '$99',
    description: 'Perfect for regular maintenance cleaning.',
    features: ['Kitchen and bathrooms', 'Dusting', 'Floors', 'Trash removal'],
  },
  {
    name: 'Deep Cleaning',
    price: '$189',
    description: 'A detailed cleaning for a spotless home.',
    features: ['Inside appliances', 'Baseboards', 'Detailed bathrooms', 'Premium checklist'],
    highlighted: true,
  },
  {
    name: 'Premium Cleaning',
    price: '$279',
    description: 'Best for large homes, offices and special services.',
    features: ['Priority scheduling', 'Extra rooms', 'Custom requests', 'Dedicated team'],
  },
];

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="section-header">
        <span className="eyebrow">Simple pricing</span>
        <h2>Transparent plans for every cleaning need</h2>
        <p>
          Choose a starting package and we will confirm the final estimate before
          your appointment.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-card ${plan.highlighted ? 'featured-card' : ''}`}
            key={plan.name}
          >
            <h3>{plan.name}</h3>
            <strong>{plan.price}</strong>
            <p>{plan.description}</p>

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <a href="#booking" className="btn-card">
              Book now
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}