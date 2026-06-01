export function Navbar() {
  return (
    <header className="navbar">
      <a href="#" className="navbar-logo">
        <span className="logo-icon">✦</span>
        <span>Miami Bright</span>
      </a>

      <nav className="navbar-links">
        <a href="#services">Services</a>
        <a href="#why-us">Why us</a>
        <a href="#pricing">Pricing</a>
        <a href="#booking">Booking</a>
      </nav>

      <a href="#booking" className="navbar-button">
        Get a Quote
      </a>
    </header>
  );
}