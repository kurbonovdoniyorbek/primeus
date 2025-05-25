import React, { useState, useEffect,useRef } from "react";
import { Truck, Phone, Mail } from "lucide-react";
import './App.css';
import CountUp from 'react-countup';
import logo from './source/logo.png'; 
import aboutus from './source/aboutus.jpg'; 
import { useInView } from 'react-intersection-observer';

export default function App() {
  const [page, setPage] = useState('home');

  // Initialize emailjs once
  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init('ybZ4fNyGeTceqlDHA');
    }
  }, []);

  const handleNavigate = (pageName) => {
    setPage(pageName);
  };


 
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
          <a href="/"><img src={logo} alt="Prime Us Inc Carrier Logo" /></a>
          </div>
          <ul className="navbar-links">
            {page !== 'home' && (
              <li><button onClick={() => handleNavigate('home')} className="nav-button">
                 <li><a>Home</a></li>
                 </button></li>
            )}
            {page !== 'about' && (
              <li><button onClick={() => handleNavigate('about')} className="nav-button">
            <li><a href="#about">ABOUT US</a></li>
                </button></li>
            )}
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </nav>

      {/* Render pages based on state */}
      {page === 'home' ? (
        <MainPage onAboutClick={() => handleNavigate('about')} />
      ) : (
        <AboutUsPage onBack={() => handleNavigate('home')} />
      )}
    </div>
  );
}

// =================== Your Full Main Page with all buttons, sections, etc. ===================

function MainPage({ onAboutClick }) {
  const testimonials = [
    {
      text: "Prime Us Inc Carrier has been an invaluable partner for our logistics. Their reliability and communication are top-notch.",
      author: "- John Doe, Logistics Manager at ABC Corp"
    },
    {
      text: "Excellent service and timely delivery. Highly recommend Prime Us Inc Carrier for all logistics needs.",
      author: "- Jane Smith, COO at XYZ Ltd"
    },
    {
      text: "Their team is professional and attentive. Our shipments are always handled with care.",
      author: "- Mike Johnson, Supply Chain Director"
    },
    {
      text: "Fast and reliable shipping, every time.",
      author: "- Alice Williams, Operations Head"
    },
    {
      text: "Great customer support and flexible scheduling.",
      author: "- Bob Brown, Logistics Coordinator"
    }
  ];

  const slidesPerView = 3; // show 3 at a time
  const [currentIndex, setCurrentIndex] = useState(slidesPerView); // start from first real slide
  const slideRef = useRef(null);
  const transitionRef = useRef(null);
  const autoSlideRef = useRef(null);
  const [page, setPage] = useState('home');

   const { ref, inView } = useInView({
    triggerOnce: true, // start counting only once
    threshold: 0.5,     // 50% of the element is visible
  });
   const handleNavigate = (pageName) => {
    setPage(pageName);
  };

  // Clone first and last few slides for infinite looping
  const extendedTestimonials = [
    ...testimonials.slice(-slidesPerView), // last 3
    ...testimonials,
    ...testimonials.slice(0, slidesPerView) // first 3
  ];

  const totalSlides = extendedTestimonials.length;

  // Auto slide every 3 seconds
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const startAutoSlide = () => {
    autoSlideRef.current = setInterval(() => {
      handleNext();
    }, 3000);
  };

  const handleNext = () => {
   if(currentIndex === totalSlides.length){ 
    setCurrentIndex(0)
   }else{
     setCurrentIndex(prev => prev + 1);
   }
  };

  const handlePrev = () => {
     if(currentIndex === 0){ 
    setCurrentIndex(totalSlides.length)
   }else{
     setCurrentIndex(prev => prev - 1);
   }
  };

  // Handle transition end to loop seamlessly
  const handleTransitionEnd = () => {
    if (currentIndex >= testimonials.length + slidesPerView) {
      // jump to start (without transition)
      setTransition(false);
      setCurrentIndex(slidesPerView);
    } else if (currentIndex <= slidesPerView - 1) {
      // jump to end
      setTransition(false);
      setCurrentIndex(testimonials.length);
    }
  };

  // To control transition effect
  const [transition, setTransition] = useState(true);

  // When currentIndex changes, enable transition
  useEffect(() => {
    if (slideRef.current) {
      if (transition) {
        slideRef.current.style.transition = 'transform 0.5s ease-in-out';
      } else {
        slideRef.current.style.transition = 'none';
      }
    }
  }, [transition, currentIndex]);

  // When currentIndex updates, enable transition
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentIndex * (100 / slidesPerView)}%)`;
    }
  }, [currentIndex]);

  // Touch support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    clearInterval(autoSlideRef.current); // optional: pause auto slide on manual
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = touchEndX.current - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
    startAutoSlide(); // resume auto slide
  };

  // State for your quote form
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phoneNumber: '',
    reason: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Your full page content (buttons, sections, etc.)
  // You can also add your own styling/classes as needed

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
    setSuccess(false);
  };

  // Handle form submission (emailjs)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await window.emailjs.send('service_htomd9q', 'template_6wlb2wm', {
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        reason: formData.reason,
        message: formData.message
      });
      alert('Your request has been sent successfully!');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        phoneNumber: '',
        reason: '',
        message: ''
      });
      setSuccess(true);
    } catch (err) {
      console.error('Failed to send email:', err);
      alert('Failed to send email. Please try again later.');
      setError('Failed to send email');
    } finally {
      setLoading(false);
    }}
  return (
    <main className="page">

      {/* Hero / Welcome */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Driving Your Business Forward</h1>
          <p className="hero-text">
            Prime Us Inc Carrier provides unparalleled freight transportation services across the nation. Experience reliability, efficiency, and dedicated support for all your logistics needs.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Contact us</a>
     <a href="#about"  onClick={() => handleNavigate('about')} className="btn btn-secondary">About Us</a>

            
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Comprehensive logistics solutions tailored to your needs.</p>
        <div className="cards">
          <div className="card">
            <div className="card-icon"><Truck size={48} color="#00FFFF" /></div>
            <h3 className="card-title">Full Truckload (FTL)</h3>
            <p className="card-text">Efficient and dedicated transport for your large shipments across all 50 states.</p>
          </div>
          <div className="card">
            <div className="card-icon"><Phone size={48} color="#00FFFF" /></div>
            <h3 className="card-title">Less Than Truckload (LTL)</h3>
            <p className="card-text">Cost-effective solutions for smaller shipments, consolidated for efficiency.</p>
          </div>
          <div className="card">
            <div className="card-icon"><Mail size={48} color="#00FFFF" /></div>
            <h3 className="card-title">Expedited Freight</h3>
            <p className="card-text">Urgent delivery services to meet your critical timelines with speed and precision.</p>
          </div>
        </div>
      </section>

       <div className="facts-section container">
      <h6 className="section-title">Prime Us incorporated</h6>
      <h2 className="section-heading">Simplify, Track, and Manage All Your Shipments in One Place</h2>
      <p className="section-description">
      We take pride in our transparent approach, giving customers full visibility into our performance. Our easy-to-use platform allows clients to track every shipment and see the number of loads we've delivered successfully. This openness not only provides valuable insights but also builds trust in our consistent commitment to exceptional service.
      </p>
      
      <div className="facts-cards">
      
        <div className="fact-card bg-secondary">
          <div className="fact-number" ref={ref}> {inView && <CountUp end={3334} duration={2} />}</div>
          <div className="fact-label">Happy Clients</div>
        </div>
        <div className="fact-card bg-info">
           <div className="fact-number" ref={ref}>{inView && <CountUp end={186} duration={2} />}</div>
          <div className="fact-label">Monthly Completed Shipments</div>
        </div>
        <div className="fact-card bg-success">
          <div className="fact-number" ref={ref}>{inView && <CountUp end={389} duration={2} />}</div>
          <div className="fact-label">Customer Feedback</div>
        </div> 
      <div className="fact-card bg-primary">
          <div className="icon"><i className="fas fa-headset"></i></div>
          <div  className="fact-number"><a href="tel:+1 (630) 230 6928" className="fact_number_css">+1 (630) 230 6928</a></div>
          <div className="fact-label">Have a question? Giveus a call!</div>
        </div>
      </div>
    </div>

      {/* Testimonials */}
      <section style={{ padding: '7rem 2rem', backgroundColor: '#101E2C', textAlign: 'center' }}>
      <h2 className="section-title" style={{ color: 'white', marginBottom: '2rem' }}>What Our Clients Say</h2>
      <div
        style={{
          overflow: 'hidden',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative'
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
      >
        <div
          ref={slideRef}
          style={{
            display: 'flex',
            width: `${(extendedTestimonials.length * 100) / slidesPerView}%`,
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTestimonials.map((item, index) => (
            <div
              key={index}
              style={{
                flex: `0 0 ${100 / slidesPerView}%`,
                boxSizing: 'border-box',
                padding: '1rem'
              }}
            >
              <div
                style={{
                  padding: '2rem',
                  fontStyle: 'italic',
                  fontSize: '1.3rem',
                  color: '#fff',
                  borderLeft: '4px solid #00CED1',
                  backgroundColor: 'rgba(0, 206, 209, 0.06)',
                  borderRadius: '0.6rem',
                  height: '100%'
                }}
              >
                <p>"{item.text}"</p>
                <p style={{ marginTop: '2rem', fontWeight: '600', color: 'white' }}>{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Optional controls */}
      <div style={{ marginTop: '1rem' }}>
  <button onClick={handlePrev} className="nav-button">Prev</button>
  <button onClick={handleNext} className="nav-button">Next</button>
</div>
    </section>
      {/* Your full main page content: */}
      <section id="contact" className="quote-form-section">
        <div className="quote-form-container">
          <h2 className="quote-title">Contact US</h2>
          <p className="quote-text">Fill out our form and we’ll get back to you shortly with a tailored logistics proposal.</p>
          
          {/* Your form */}
          <form className="form" onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Company Name"
    name="companyName"
    value={formData.companyName}
    onChange={handleInputChange}
    required
    disabled={loading}
  />
  <input
    type="text"
    placeholder="Contact Name"
    name="contactName"
    value={formData.contactName}
    onChange={handleInputChange}
    required
    disabled={loading}
  />
  <input
    type="email"
    placeholder="Email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    required
    disabled={loading}
  />
  <input
    type="tel"
    placeholder="Phone Number"
    name="phoneNumber"
    value={formData.phoneNumber}
    onChange={handleInputChange}
    required
    disabled={loading}
  />
  <input
    type="text"
    placeholder="Reason for Contact"
    name="reason"
    value={formData.reason}
    onChange={handleInputChange}
    required
    disabled={loading}
  />
  <textarea
    placeholder="Message"
    rows="4"
    name="message"
    value={formData.message}
    onChange={handleInputChange}
    disabled={loading}
  />
  <button type="submit" disabled={loading}>
    {loading ? 'Sending...' : 'Send Request'}
  </button>
  {success && <p style={{ color: 'green' }}>Request sent successfully! We will contact you shortly.</p>}
  {error && <p style={{ color: 'red' }}>{error}</p>}
</form>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-info">
          <p><Phone size={20} color="#00FFFF" />  +1 (630) 230 6928</p>
          <p><Mail size={20} color="#00FFFF" /> primeus7inc@gmail.com</p>
          <p><Truck size={20} color="#00FFFF" />13310 Mary lee CT Plainfiled IL 60585</p>
        </div>
      </section>

    </main>
  );
}

// =================== Your About Us Page ===================
function AboutUsPage({ onBack }) {
  return (
    <main className="page">
      <section className="about-section">
        <h2 className="section-title">About Us</h2>
        <img src={aboutus} alt="" />
        <p className="about-text">
         At Prime Us, Inc. (MC# 1414581), we are committed to delivering excellence in logistics and transportation services across the United States. Since our inception in 2022, we have been dedicated to providing reliable, efficient, and secure freight solutions that meet the evolving needs of our clients.

With a strong focus on safety, punctuality, and customer satisfaction, our experienced team and modern fleet ensure your cargo is handled with the utmost care from pickup to delivery. Whether you require general freight transportation or customized logistics support, we tailor our services to optimize your supply chain and reduce operational complexities.

We believe that transportation is more than just moving goods — it’s about building lasting partnerships based on trust, transparency, and professionalism. Our commitment to compliance and industry best practices means you can count on us for dependable service every step of the way.

Choose Prime Us, Inc. for your logistics needs — where your freight is our priority.
        </p>
        <button className="btn btn-secondary" onClick={onBack}>Back to Home</button>
      </section>
    </main>
  );
}