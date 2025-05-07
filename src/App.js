import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Router, Route, Routes, Link
import { Truck, Phone, Mail } from "lucide-react"; // Added Info and Globe icons
import './App.css';

// Import new placeholder page components
import AboutPage from './components/About';
import TrackingPage from './components/Tracking';
import ServicesPage from './components/ServicesPage'; // Component for the Services section
import ContactPage from './components/ContactPage'; // Component for the Contact section
import QuotePage from './components/QuotePage'; // Component for the Quote section


// Placeholder component for the main landing page content
const LandingPageContent = () => {
  // Refs for elements to animate
  const sectionTitleRefs = useRef([]);
  const sectionSubtitleRefs = useRef([]);
  const cardRefs = useRef([]);
  const testimonialRef = useRef(null);
  const quoteFormRef = useRef(null);
  const contactInfoRef = useRef(null);

  // Intersection Observer to trigger animations on scroll
  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Optional: stop observing once animated
          // observer.unobserve(entry.target);
        } else {
          // Optional: remove animate class when not visible
          // entry.target.classList.remove('animate');
        }
      });
    }, observerOptions);

    // Observe elements
    sectionTitleRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    sectionSubtitleRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    cardRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    if (testimonialRef.current) observer.observe(testimonialRef.current);
    if (quoteFormRef.current) observer.observe(quoteFormRef.current);
    if (contactInfoRef.current) observer.observe(contactInfoRef.current);


    // Cleanup function
    return () => {
      sectionTitleRefs.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
      sectionSubtitleRefs.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
      cardRefs.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
      if (testimonialRef.current) observer.unobserve(testimonialRef.current);
      if (quoteFormRef.current) observer.unobserve(quoteFormRef.current);
      if (contactInfoRef.current) observer.unobserve(contactInfoRef.current);
    };
  }, []);

  // State to manage form input values (from your original code)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    shipmentDetails: '',
    additionalMessage: ''
  });

  // Replace with the actual URL of your backend endpoint (from your original code)
  const BACKEND_ENDPOINT = '/api/submit-quote'; // <<< REPLACE THIS WITH YOUR BACKEND URL

  // State to manage loading and error states (from your original code)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes (from your original code)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear previous states on input change
    setError(null);
    setSuccess(false);
  };

  // Handle form submission (from your original code)
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setLoading(true); // Set loading state
    setError(null); // Clear previous errors
    setSuccess(false); // Clear previous success

    try {
      const response = await fetch(BACKEND_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other necessary headers (e.g., authentication tokens)
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If backend doesn't send JSON error, use default
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Success:', result);
      setSuccess(true);

      setFormData({
        name: '',
        email: '',
        company: '',
        shipmentDetails: '',
        additionalMessage: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="page">
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Driving Your Business Forward</h1>
          <p className="hero-text">
            Prime Us Inc Carrier provides unparalleled freight transportation services across the nation. Experience reliability, efficiency, and dedicated support for all your logistics needs.
          </p>
          <div className="hero-buttons">
            <Link to="/quote" className="btn btn-primary">Get a Free Quote</Link> {/* Use Link */}
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link> {/* Use Link */}
          </div>
        </div>
      </section>

      {/* Services Section - Can be a separate page or part of landing */}
      <section id="services" className="services">
        <h2 className="section-title" ref={el => sectionTitleRefs.current[0] = el}>Our Services</h2>
        <p className="section-subtitle" ref={el => sectionSubtitleRefs.current[0] = el}>Comprehensive logistics solutions tailored to your needs.</p>
        <div className="cards">
          <div className="card" ref={el => cardRefs.current[0] = el}>
            <div className="card-icon"><Truck size={48} /></div>
            <h3 className="card-title">Full Truckload (FTL)</h3>
            <p className="card-text">Efficient and dedicated transport for your large shipments across all 50 states.</p>
          </div>
          <div className="card" ref={el => cardRefs.current[1] = el}>
            <div className="card-icon"><Truck size={48} /></div>
            <h3 className="card-title">Less Than Truckload (LTL)</h3>
            <p className="card-text">Cost-effective solutions for smaller shipments, consolidated for efficiency.</p>
          </div>
          <div className="card" ref={el => cardRefs.current[2] = el}>
            <div className="card-icon"><Truck size={48} /></div>
            <h3 className="card-title">Expedited Freight</h3>
            <p className="card-text">Urgent delivery services to meet your critical timelines with speed and precision.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonials">
        <h2 className="section-title" ref={el => sectionTitleRefs.current[1] = el}>What Our Clients Say</h2>
        <div className="testimonial-card" ref={testimonialRef}>
          <p>"Prime Us Inc Carrier has been an invaluable partner for our logistics. Their reliability and communication are top-notch."</p>
          <p className="testimonial-author">- John Doe, Logistics Manager at ABC Corp</p>
        </div>
      </section>

      {/* Quote Form Section - Can be a separate page or part of landing */}
      <section id="quote" className="quote-form-section">
        <div className="quote-form-container" ref={quoteFormRef}>
          <h2 className="quote-title" ref={el => sectionTitleRefs.current[2] = el}>Request a Quote</h2>
          <p className="quote-text" ref={el => sectionSubtitleRefs.current[1] = el}>Fill out our form and we’ll get back to you shortly with a tailored logistics proposal.</p>
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Company Name"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Shipment Details (Origin, Destination, Type)"
              name="shipmentDetails"
              value={formData.shipmentDetails}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <textarea
              placeholder="Additional Message / Details"
              rows="4"
              name="additionalMessage"
              value={formData.additionalMessage}
              onChange={handleInputChange}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>

            {success && <p style={{ color: 'green' }}>Quote request sent successfully! We will contact you shortly.</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

          </form>
        </div>
      </section>

      {/* Contact Section - Can be a separate page or part of landing */}
      <section id="contact" className="contact-section">
        <h2 className="section-title" ref={el => sectionTitleRefs.current[3] = el}>Contact Us</h2>
        <div className="contact-info" ref={contactInfoRef}>
          <p><Phone size={20} /> (123) 456-7890</p>
          <p><Mail size={20} /> safetyprimeus@gmail.com</p>
          <p><Truck size={20} /> Plainfield IL</p>
        </div>
      </section>
    </main>
  );
};

// Main App component with Routing
export default function App() {
  return (
    <Router>
      <div className="landing-page">
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">
              {/* <img src={logo} alt="Prime Us Inc Carrier Logo" /> */}
              <Link to="/">Prime Us Inc Carrier</Link> {/* Link logo to Home */}
            </div>
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li> {/* Link to Services Page */}
              <li><Link to="/tracking">Tracking</Link></li>   {/* Link to Tracking Page */}
              <li><Link to="/about">About Us</Link></li>     {/* Link to About Page */}
              <li><Link to="/contact">Contact</Link></li>   {/* Link to Contact Page */}
              <li><Link to="/quote">Get a Quote</Link></li>   {/* Link to Quote Page */}
            </ul>
          </div>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<LandingPageContent />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote" element={<QuotePage />} />
          {/* Add a catch-all for 404 if needed */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>

        <footer className="footer">
          <div className="footer-container">
            <p>© 2023 Prime Us Inc Carrier. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}