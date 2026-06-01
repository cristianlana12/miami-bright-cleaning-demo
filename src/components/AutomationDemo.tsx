export function AutomationDemo() {
  return (
    <section className="section automation-section">
      <div className="automation-wrapper">
        <div className="automation-content">
          <span className="eyebrow">Business automation demo</span>

          <h2>More than a website: a complete booking automation system</h2>

          <p>
            This demo shows how a cleaning business can receive online bookings,
            manage requests from an admin dashboard and automatically notify
            customers when their service status changes.
          </p>

          <div className="automation-list">
            <div>
              <strong>01</strong>
              <span>Customer submits a cleaning request</span>
            </div>

            <div>
              <strong>02</strong>
              <span>The request appears in the admin dashboard</span>
            </div>

            <div>
              <strong>03</strong>
              <span>The business confirms, cancels or completes the service</span>
            </div>

            <div>
              <strong>04</strong>
              <span>The customer receives email and WhatsApp notifications</span>
            </div>
          </div>
        </div>

        <div className="automation-card">
          <div className="automation-card-header">
            <span>Automation flow</span>
            <strong>Live system</strong>
          </div>

          <div className="automation-step active">
            <span>Booking received</span>
            <small>Email + WhatsApp sent</small>
          </div>

          <div className="automation-step">
            <span>Status updated</span>
            <small>Admin confirms request</small>
          </div>

          <div className="automation-step">
            <span>Customer notified</span>
            <small>Message delivered instantly</small>
          </div>
        </div>
      </div>
    </section>
  );
}