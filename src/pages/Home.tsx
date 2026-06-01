import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Pricing } from '../components/Pricing';
import { BookingForm } from '../components/BookingForm';
import { Testimonials } from '../components/Testimonials';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { WhyChooseUs } from '../components/WhyChooseUs';

export function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Pricing />
      <BookingForm />
      <Testimonials />
      <Footer />
    </>
  );
}