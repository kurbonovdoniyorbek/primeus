import React, { useEffect, useState } from "react";
import { Truck, Phone, Mail } from "lucide-react";
import './App.css';
import CountUp from 'react-countup';
import logo from './source/logo.png'; 
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PrivacyPolicy from "./source/components/PrivacyPolicy";
import TermsAndConditions from "./source/components/TermsAndConditions";

export default function App() {
  return (
    <Router>
        <MainLayot/>
       <Routes>
         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/aboutus" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}



function MainLayot() {
  const [page, setPage] = useState('home');
  const [navON,setNavOn] = useState(true)
   const location = useLocation();
  console.log(navON)
  const handleNavigate = (pageName) => {
    setPage(pageName);
  };

  const handleScrollToSection = (id) => {
  if (page !== 'home') {
    setPage('home');
    // keyin scroll qilishni kutish uchun setTimeout
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // sahifa render bo'lishini kutish uchun
  } else {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
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
   {!navON && (
    <li>
      <button onClick={() => setNavOn(true)} className="nav-button">
    <Link to="/" className="nav-button" onClick={() => setNavOn(false)}>
       MAIN PAGE
    </Link>
      </button>
    </li>
  )}
  {navON && (
    <li>
      <button onClick={() => setNavOn(false)} className="nav-button">
        <Link to="/aboutus" className="nav-button" onClick={() => setNavOn(false)}>
          ABOUT US
    </Link>
      </button>
    </li>
  )}
  <li>
    <button className="nav-button" onClick={() => handleScrollToSection('services')}>
      <li><a>SERVICES</a></li>
    </button>
  </li>
  <li>
    <button className="nav-button" onClick={() => handleScrollToSection('contact')}>
      <li><a>CONTACT US</a></li>
    </button>
  </li>
</ul>

        </div>
      </nav>

      {/* Render pages based on state */}
      <>
      {location.pathname === "/" ? <MainPage /> : <></>}
    </>
    </div>
  );
}

// =================== Your Full Main Page with all buttons, sections, etc. ===================

function MainPage({ onAboutClick }) {
  // const testimonials = [
  //   {
  //     text: "Prime Us Inc Carrier has been an invaluable partner for our logistics. Their reliability and communication are top-notch.",
  //     author: "- John Doe, Logistics Manager at ABC Corp"
  //   },
  //   {
  //     text: "Excellent service and timely delivery. Highly recommend Prime Us Inc Carrier for all logistics needs.",
  //     author: "- Jane Smith, COO at XYZ Ltd"
  //   },
  //   {
  //     text: "Their team is professional and attentive. Our shipments are always handled with care.",
  //     author: "- Mike Johnson, Supply Chain Director"
  //   },
  //   {
  //     text: "Fast and reliable shipping, every time.",
  //     author: "- Alice Williams, Operations Head"
  //   },
  //   {
  //     text: "Great customer support and flexible scheduling.",
  //     author: "- Bob Brown, Logistics Coordinator"
  //   }
  // ];


  const brokers = [
    {
      img:"https://www.its4logistics.com/apple-icon.png?7aa8a3c50b6a41ef"
    },
       {
      img:"https://media.licdn.com/dms/image/v2/D4E0BAQGjnz3W8MylZQ/company-logo_200_200/company-logo_200_200/0/1689271581018/sagefreight_logo?e=2147483647&v=beta&t=rwv40FKl-eJRDNGUpwo58v3w4G1Rf22Pi0kT2VU0iNE"
    },{
      img:"https://media.licdn.com/dms/image/v2/D4D0BAQEPH6Gfo3M7xw/company-logo_200_200/B4DZTW1.RkG8AQ-/0/1738771261140/echo_global_logistics_logo?e=2147483647&v=beta&t=MJSwyTESF9-lSvWPvzGYGWmimt3EkaHlMTS49gI7adc"
    }, {
      img:"https://www.its4logistics.com/apple-icon.png?7aa8a3c50b6a41ef"
    },
       {
      img:"https://media.licdn.com/dms/image/v2/D4E0BAQGjnz3W8MylZQ/company-logo_200_200/company-logo_200_200/0/1689271581018/sagefreight_logo?e=2147483647&v=beta&t=rwv40FKl-eJRDNGUpwo58v3w4G1Rf22Pi0kT2VU0iNE"
    },{
      img:"https://media.licdn.com/dms/image/v2/D4D0BAQEPH6Gfo3M7xw/company-logo_200_200/B4DZTW1.RkG8AQ-/0/1738771261140/echo_global_logistics_logo?e=2147483647&v=beta&t=MJSwyTESF9-lSvWPvzGYGWmimt3EkaHlMTS49gI7adc"
    }
  ]


  const [page, setPage] = useState('home');
  

   const { ref, inView } = useInView({
    triggerOnce: true, // start counting only once
    threshold: 0.5,     // 50% of the element is visible
  });
   const handleNavigate = (pageName) => {
    setPage(pageName);
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



  // Handle form input change
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (emailjs)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('https://formspree.io/f/movdozdv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        alert('Request sent successfully!');
        setFormData({
          companyName: '',
          contactName: '',
          email: '',
          phoneNumber: '',
          reason: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Form submission failed');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }

    }
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
     <a href="/about"  onClick={() => handleNavigate('about')} className="btn btn-secondary">About Us</a>

            
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
          <div className="fact-number" ref={ref}> {inView && <CountUp end={10655} duration={2} />}</div>
          <div className="fact-label">Happy Clients</div>
        </div>
        <div className="fact-card bg-info">
           <div className="fact-number" ref={ref}>{inView && <CountUp end={3243} duration={2} />}</div>
          <div className="fact-label">Monthly Completed Shipments</div>
        </div>
        <div className="fact-card bg-success">
          <div className="fact-number" ref={ref}>{inView && <CountUp end={5664} duration={2} />}</div>
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
      <section style={{ padding: '2rem 2rem', backgroundColor: '#fff', textAlign: 'center' }}>
      <h2 className="section-title" style={{ color: '#000', marginBottom: '2rem' }}>Proud to Work With These Brokers</h2>
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
  slidesPerView={1}
  loop={true}
  centeredSlides={true}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    600: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
  speed={600}
           >
          {brokers.map((item, index) => (
            <SwiperSlide
              key={index}>
              <div className="img_slide_testimone">
                <img src={item.img} alt="" />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
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
  <div className="terms-of-policy">
      <p className="terms-text">
    By providing your phone number, you agree to receive SMS messages from Primeus.
    Message frequency varies. Message & data rates may apply. 
  </p>
  <div>
    <a href="/privacy-policy">Privacy Policy</a> |
    <a href="/terms-and-conditions">Terms & Conditions</a>
  </div>
  </div>
        </div>
      </section>

      {/* Contact Info */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-info">
          <p><Phone size={20} color="#00FFFF" /> +1 630 538 4723</p>
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
      <section className="about-section-with-bg">
        <div className="overlay">
          <h2 className="about_us-title">About Us</h2>
          <p className="about-text">
            At Prime Us, Inc. (MC# 1414581), we are committed to delivering excellence in logistics and transportation services across the United States. Since our inception in 2022, we have been dedicated to providing reliable, efficient, and secure freight solutions that meet the evolving needs of our clients.
            <br /><br />
            With a strong focus on safety, punctuality, and customer satisfaction, our experienced team and modern fleet ensure your cargo is handled with the utmost care from pickup to delivery. Whether you require general freight transportation or customized logistics support, we tailor our services to optimize your supply chain and reduce operational complexities.
            <br /><br />
            We believe that transportation is more than just moving goods — it’s about building lasting partnerships based on trust, transparency, and professionalism. Our commitment to compliance and industry best practices means you can count on us for dependable service every step of the way.
            <br /><br />
            Choose Prime Us, Inc. for your logistics needs — where your freight is our priority.
          </p>
        </div>
        
      </section>
    </main>
  );
}