const features = [
  {
    tag: 'Website',
    title: 'Premium business landing page',
    description:
      'A modern, responsive website designed to build trust, present services and convert visitors into booking requests.',
  },
  {
    tag: 'Booking',
    title: 'Online booking form',
    description:
      'Customers can request a service by selecting date, time, service type, address and additional details.',
  },
  {
    tag: 'Dashboard',
    title: 'Admin booking management',
    description:
      'The business can review requests, filter bookings and update each service status from a private dashboard.',
  },
  {
    tag: 'Automation',
    title: 'Automatic email notifications',
    description:
      'Customers receive email updates when their request is received, confirmed, completed or cancelled.',
  },
  {
    tag: 'Database',
    title: 'Cloud database with Supabase',
    description:
      'All booking information is stored securely in a cloud database, ready to scale into a real business system.',
  },
  {
    tag: 'Backend',
    title: 'FastAPI backend integration',
    description:
      'A Python backend handles booking creation, status updates, notifications and future business logic.',
  },
];

export function SystemIncludes() {
  return (
    <section className="section system-section" id="system">
      <div className="section-header">
        <span className="eyebrow">What this system includes</span>
        <h2>A complete digital solution for a local service business</h2>
        <p>
          This demo is not just a visual website. It connects frontend, backend,
          database, admin tools and email automation into one working product.
        </p>
      </div>

      <div className="system-grid">
        {features.map((feature) => (
          <article className="system-card" key={feature.title}>
            <span>{feature.tag}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}