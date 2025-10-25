// // // // LandingPage.js
// // // import React from "react";
// // // import "./LandingPage.css";
// // // import apartmentImg from "../assets/apartment.png";

// // // function LandingPage() {
// // //   return (
// // //     <div className="landing-container">
// // //       {/* Left Side - Text */}
// // //       <div className="landing-content">
// // //         <h1 className="landing-title">
// // //           Apartment Pipeline Leakage System
// // //         </h1>
// // //         <p className="landing-description">
// // //           A smart monitoring solution designed to detect and prevent water
// // //           leakage in apartment pipelines. Our system provides real-time alerts,
// // //           water usage statistics, and motor control to ensure efficient water
// // //           management and safety for all residents.
// // //         </p>
// // //         <button
// // //           className="landing-btn"
// // //           onClick={() => (window.location.href = "/login")}
// // //         >
// // //           Get Started
// // //         </button>
// // //       </div>

// // //       {/* Right Side - Image */}
// // //       <div className="landing-image">
// // //         <img src={apartmentImg} alt="Apartment" />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default LandingPage;

// // // LandingPage.js
// // import React, { useEffect } from "react";
// // import "./LandingPage.css";
// // import apartmentImg from "../assets/apartment.png";

// // function LandingPage() {
// //   useEffect(() => {
// //     // Add scroll animation effect
// //     const observerOptions = {
// //       threshold: 0.1,
// //       rootMargin: '0px 0px -50px 0px'
// //     };

// //     const observer = new IntersectionObserver((entries) => {
// //       entries.forEach(entry => {
// //         if (entry.isIntersecting) {
// //           entry.target.classList.add('fade-in-visible');
// //         }
// //       });
// //     }, observerOptions);

// //     // Observe all sections
// //     document.querySelectorAll('.section-animate').forEach(section => {
// //       observer.observe(section);
// //     });

// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <div className="landing-page">
// //       {/* Hero Section */}
// //       <section className="hero-section">
// //         <div className="hero-container">
// //           <div className="hero-content">
// //             <h1 className="hero-title">
// //               Apartment Pipeline<br />Leakage System
// //             </h1>
// //             <p className="hero-description">
// //               A smart monitoring solution designed to detect and prevent water
// //               leakage in apartment pipelines. Our system provides real-time alerts,
// //               water usage statistics, and motor control to ensure efficient water
// //               management and safety for all residents.
// //             </p>
// //             <div className="hero-actions">
// //               <button
// //                 className="hero-btn primary"
// //                 onClick={() => (window.location.href = "/login")}
// //               >
// //                 Get Started
// //               </button>
// //               <button
// //                 className="hero-btn secondary"
// //                 onClick={() => document.getElementById('why-choose-us').scrollIntoView({ behavior: 'smooth' })}
// //               >
// //                 Learn More
// //               </button>
// //             </div>
// //           </div>
// //           <div className="hero-image">
// //             <img src={apartmentImg} alt="Apartment Pipeline System" />
// //           </div>
// //         </div>
// //       </section>

// //       {/* Why Choose Us Section */}
// //       <section id="why-choose-us" className="section-animate why-choose-us">
// //         <div className="container">
// //           <div className="section-header">
// //             <h6 className="section-subtitle">WHY CHOOSE US</h6>
// //             <h2 className="section-title">Why Choose Our System</h2>
// //             <p className="section-description">
// //               We provide comprehensive water leakage protection with advanced technology 
// //               and reliable service that sets us apart from traditional solutions.
// //             </p>
// //           </div>
// //           <div className="features-grid">
// //             <div className="feature-card">
// //               <div className="feature-icon">
// //                 <i className="fas fa-shield-alt"></i>
// //               </div>
// //               <h3>24/7 Protection</h3>
// //               <p>Round-the-clock monitoring with instant leak detection and automatic shut-off capabilities to prevent damage.</p>
// //             </div>
// //             <div className="feature-card">
// //               <div className="feature-icon">
// //                 <i className="fas fa-bolt"></i>
// //               </div>
// //               <h3>Real-time Alerts</h3>
// //               <p>Immediate notifications sent to your mobile and email at the first sign of potential water leakage.</p>
// //             </div>
// //             <div className="feature-card">
// //               <div className="feature-icon">
// //                 <i className="fas fa-chart-bar"></i>
// //               </div>
// //               <h3>Water Analytics</h3>
// //               <p>Detailed usage statistics and consumption patterns to help optimize water usage and reduce costs.</p>
// //             </div>
// //             <div className="feature-card">
// //               <div className="feature-icon">
// //                 <i className="fas fa-cogs"></i>
// //               </div>
// //               <h3>Smart Control</h3>
// //               <p>Remote motor control and system management from anywhere through our secure web platform.</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Services Section */}
// //       <section className="section-animate services-section">
// //         <div className="container">
// //           <div className="section-header">
// //             <h6 className="section-subtitle">OUR SERVICES</h6>
// //             <h2 className="section-title">Comprehensive Water Management</h2>
// //             <p className="section-description">
// //               Complete suite of services designed for modern apartment complexes to ensure water safety and efficiency.
// //             </p>
// //           </div>
// //           <div className="services-grid">
// //             <div className="service-card">
// //               <div className="service-icon">
// //                 <i className="fas fa-tachometer-alt"></i>
// //               </div>
// //               <h3>System Overview</h3>
// //               <p>Complete dashboard showing real-time status of all monitored pipelines, pressure levels, and equipment health.</p>
// //               <a href="/overview" className="service-link">Learn More →</a>
// //             </div>
// //             <div className="service-card">
// //               <div className="service-icon">
// //                 <i className="fas fa-bell"></i>
// //               </div>
// //               <h3>Live Alerts</h3>
// //               <p>Instant notifications for leakage detection, abnormal water flow, pressure drops, and system malfunctions.</p>
// //               <a href="/alerts" className="service-link">Learn More →</a>
// //             </div>
// //             <div className="service-card">
// //               <div className="service-icon">
// //                 <i className="fas fa-history"></i>
// //               </div>
// //               <h3>Log History</h3>
// //               <p>Comprehensive records of all events, alerts, maintenance activities, and system performance metrics.</p>
// //               <a href="/history" className="service-link">Learn More →</a>
// //             </div>
// //             <div className="service-card">
// //               <div className="service-icon">
// //                 <i className="fas fa-user-cog"></i>
// //               </div>
// //               <h3>Admin Control</h3>
// //               <p>Advanced management tools for system configuration, user permissions, maintenance scheduling, and reporting.</p>
// //               <a href="/admin" className="service-link">Learn More →</a>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Footer */}
// //       <footer className="landing-footer">
// //         <div className="container">
// //           <div className="footer-content">
// //             <div className="footer-section">
// //               <h4>Apartment Pipeline Leakage System</h4>
// //               <p>Smart water management solutions for modern residential complexes. Protecting your property 24/7.</p>
// //               <div className="social-links">
// //                 <a href="#"><i className="fab fa-facebook-f"></i></a>
// //                 <a href="#"><i className="fab fa-twitter"></i></a>
// //                 <a href="#"><i className="fab fa-linkedin-in"></i></a>
// //                 <a href="#"><i className="fab fa-instagram"></i></a>
// //               </div>
// //             </div>
// //             <div className="footer-section">
// //               <h4>Quick Links</h4>
// //               <ul>
// //                 <li><a href="/overview">System Overview</a></li>
// //                 <li><a href="/alerts">Live Alerts</a></li>
// //                 <li><a href="/history">Log History</a></li>
// //                 <li><a href="/admin">Admin Control</a></li>
// //               </ul>
// //             </div>
// //             <div className="footer-section">
// //               <h4>Features</h4>
// //               <ul>
// //                 <li>Real-time Monitoring</li>
// //                 <li>Automatic Shut-off</li>
// //                 <li>Mobile App</li>
// //                 <li>Usage Analytics</li>
// //                 <li>Maintenance Alerts</li>
// //               </ul>
// //             </div>
// //             <div className="footer-section">
// //               <h4>Contact Info</h4>
// //               <p><i className="fas fa-envelope"></i> srimathi@watersystem.com</p>
// //               <p><i className="fas fa-phone"></i> 91+9345200277</p>
// //               <p><i className="fas fa-map-marker-alt"></i> 123 Tech Park, Innovation City</p>
// //             </div>
// //           </div>
// //           <div className="footer-bottom">
// //             <p>Copyright © <span id="currentYear">{new Date().getFullYear()}</span> Apartment Pipeline Leakage System. All rights reserved.</p>
// //           </div>
// //         </div>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default LandingPage;


// // LandingPage.js
// import React, { useState, useEffect } from "react";
// import "./LandingPage.css";
// import apartmentImg from "../assets/apartment.png";

// function LandingPage() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     // Add scroll animation effect
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('fade-in-visible');
//         }
//       });
//     }, observerOptions);

//     // Observe all sections
//     document.querySelectorAll('.section-animate').forEach(section => {
//       observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleNavClick = (sectionId) => {
//     setIsMenuOpen(false);
//     if (sectionId === 'home') {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   const handleAuthNavigation = (path) => {
//     window.location.href = path;
//   };

//   return (
//     <div className="landing-page">
//       {/* Navigation Bar */}
//       <nav className="navbar">
//         <div className="nav-container">
//           <div className="nav-logo">
//             <img 
//               src="https://img.icons8.com/color/48/000000/water.png" 
//               alt="AquaFlow Logo" 
//               className="logo-img"
//             />
//             <h2>AquaFlow</h2>
//           </div>
          
//           <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
//             <div className="nav-item" onClick={() => handleNavClick('home')}>
//               Home
//             </div>
//             <div className="nav-item" onClick={() => handleNavClick('why-choose-us')}>
//               Features
//             </div>
//             <div className="nav-item" onClick={() => handleNavClick('services')}>
//               Services
//             </div>
//             <div className="nav-item" onClick={() => handleNavClick('contact')}>
//               Contact
//             </div>
            
//           </div>

//           <div className="nav-toggle" onClick={toggleMenu}>
//             <span className="bar"></span>
//             <span className="bar"></span>
//             <span className="bar"></span>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-container">
//           <div className="hero-content">
//             <h1 className="hero-title">
//               Smart Pipeline<br />Leakage Protection
//             </h1>
//             <p className="hero-description">
//               Advanced monitoring technology designed to detect and prevent water leakage 
//               in apartment pipelines. Get real-time alerts, detailed water analytics, and 
//               remote control to ensure complete water management safety for your residents.
//             </p>
//             <div className="hero-actions">
//               <button
//                 className="hero-btn primary"
//                 onClick={() => handleAuthNavigation("/login")}
//               >
//                 Start Free Trial
//               </button>
//               <button
//                 className="hero-btn secondary"
//                 onClick={() => handleNavClick('why-choose-us')}
//               >
//                 Explore Features
//               </button>
//             </div>
//           </div>
//           <div className="hero-image">
//             <img src={apartmentImg} alt="Apartment Pipeline System" />
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section id="why-choose-us" className="section-animate why-choose-us">
//         <div className="container">
//           <div className="section-header">
//             <h6 className="section-subtitle">ADVANTAGES</h6>
//             <h2 className="section-title">Why Property Managers Choose AquaFlow</h2>
//             <p className="section-description">
//               Comprehensive water leakage protection with cutting-edge technology 
//               that delivers proven results and peace of mind.
//             </p>
//           </div>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <i className="fas fa-shield-alt"></i>
//               </div>
//               <h3>24/7 Protection</h3>
//               <p>Continuous monitoring with instant leak detection and automatic water shut-off to prevent costly property damage.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <i className="fas fa-bolt"></i>
//               </div>
//               <h3>Instant Alerts</h3>
//               <p>Immediate SMS and email notifications at the first sign of potential water leakage or abnormal flow patterns.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <i className="fas fa-chart-bar"></i>
//               </div>
//               <h3>Smart Analytics</h3>
//               <p>Detailed water usage statistics and consumption insights to optimize usage and reduce operational costs.</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">
//                 <i className="fas fa-cogs"></i>
//               </div>
//               <h3>Remote Control</h3>
//               <p>Manage your entire water system from anywhere through our secure, user-friendly web platform and mobile app.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="section-animate services-section">
//         <div className="container">
//           <div className="section-header">
//             <h6 className="section-subtitle">SOLUTIONS</h6>
//             <h2 className="section-title">Complete Water Management Platform</h2>
//             <p className="section-description">
//               Everything you need to monitor, manage, and protect your property's water infrastructure in one integrated system.
//             </p>
//           </div>
//           <div className="services-grid">
//             <div className="service-card">
//               <div className="service-icon">
//                 <i className="fas fa-tachometer-alt"></i>
//               </div>
//               <h3>Live Dashboard</h3>
//               <p>Real-time overview of all monitored pipelines, pressure levels, valve status, and system health indicators.</p>
//               <button className="service-link">Discover More →</button>
//             </div>
//             <div className="service-card">
//               <div className="service-icon">
//                 <i className="fas fa-bell"></i>
//               </div>
//               <h3>Smart Alerts</h3>
//               <p>Customizable notifications for leaks, pressure changes, temperature fluctuations, and equipment issues.</p>
//               <button className="service-link">Discover More →</button>
//             </div>
//             <div className="service-card">
//               <div className="service-icon">
//                 <i className="fas fa-history"></i>
//               </div>
//               <h3>Activity Logs</h3>
//               <p>Comprehensive historical data of all system events, maintenance activities, and performance metrics.</p>
//               <button className="service-link">Discover More →</button>
//             </div>
//             <div className="service-card">
//               <div className="service-icon">
//                 <i className="fas fa-user-cog"></i>
//               </div>
//               <h3>Admin Portal</h3>
//               <p>Advanced controls for system configuration, user management, automated reports, and maintenance scheduling.</p>
//               <button className="service-link">Discover More →</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="cta-section">
//         <div className="container">
//           <div className="cta-content">
//             <h2>Ready to Protect Your Property with AquaFlow?</h2>
//             <p>Join hundreds of property managers who trust our system to prevent water damage and reduce maintenance costs.</p>
//             <button 
//               className="cta-btn"
//               onClick={() => handleAuthNavigation("/signup")}
//             >
//               Start Free Trial
//             </button>
//             <p className="cta-note">No credit card required • 30-day free trial</p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer id="contact" className="landing-footer">
//         <div className="container">
//           <div className="footer-content">
//             <div className="footer-section">
//               <div className="footer-logo">
//                 <img 
//                   src="https://img.icons8.com/color/48/000000/water.png" 
//                   alt="AquaFlow Logo" 
//                   className="logo-img"
//                 />
//                 <h4>AquaFlow System</h4>
//               </div>
//               <p>Advanced water monitoring solutions for modern residential and commercial properties. Protecting your investments 24/7.</p>
//               <div className="social-links">
//                 <a href="#"><i className="fab fa-facebook-f"></i></a>
//                 <a href="#"><i className="fab fa-twitter"></i></a>
//                 <a href="#"><i className="fab fa-linkedin-in"></i></a>
//                 <a href="#"><i className="fab fa-instagram"></i></a>
//               </div>
//             </div>
//             <div className="footer-section">
//               <h4>Quick Access</h4>
//               <ul>
//                 <li><button onClick={() => handleNavClick('home')}>Home</button></li>
//                 <li><button onClick={() => handleNavClick('why-choose-us')}>Features</button></li>
//                 <li><button onClick={() => handleNavClick('services')}>Services</button></li>
//                 <li><button onClick={() => handleNavClick('contact')}>Contact</button></li>
//               </ul>
//             </div>
//             <div className="footer-section">
//               <h4>Our Solutions</h4>
//               <ul>
//                 <li>Leak Detection</li>
//                 <li>Water Monitoring</li>
//                 <li>Preventive Alerts</li>
//                 <li>Usage Analytics</li>
//                 <li>Mobile App</li>
//               </ul>
//             </div>
//             <div className="footer-section">
//               <h4>Contact Us</h4>
//               <p><i className="fas fa-envelope"></i> info@aquaflow.com</p>
//               <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
//               <p><i className="fas fa-map-marker-alt"></i> 123 Tech Park, Innovation City</p>
//             </div>
//           </div>
//           <div className="footer-bottom">
//             <p>Copyright © <span id="currentYear">{new Date().getFullYear()}</span> AquaFlow Pipeline Systems. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;



// LandingPage.js
import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import apartmentImg from "../assets/apartment.png";

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Add scroll animation effect
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section-animate').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img 
              src="https://img.icons8.com/color/48/000000/water.png" 
              alt="AquaFlow Logo" 
              className="logo-img"
            />
            <h2>AquaFlow</h2>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-item" onClick={() => handleNavClick('home')}>
              Home
            </div>
            <div className="nav-item" onClick={() => handleNavClick('why-choose-us')}>
              Features
            </div>
            <div className="nav-item" onClick={() => handleNavClick('services')}>
              Services
            </div>
            <div className="nav-item" onClick={() => handleNavClick('contact')}>
              Contact
            </div>
          </div>

          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Pipeline<br />Leakage Protection
            </h1>
            <p className="hero-description">
              Advanced monitoring technology designed to detect and prevent water leakage 
              in apartment pipelines. Get real-time alerts, detailed water analytics, and 
              remote control to ensure complete water management safety for your residents.
            </p>
            <div className="hero-actions">
              <button
                className="hero-btn primary"
                onClick={() => handleAuthNavigation("/login")}
              >
                Start Free Trial
              </button>
              <button
                className="hero-btn secondary"
                onClick={() => handleNavClick('why-choose-us')}
              >
                Explore Features
              </button>
            </div>
          </div>
          <div className="hero-image">
            <img src={apartmentImg} alt="Apartment Pipeline System" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="section-animate why-choose-us">
        <div className="container">
          <div className="section-header">
            <h6 className="section-subtitle">ADVANTAGES</h6>
            <h2 className="section-title">Why Property Managers Choose AquaFlow</h2>
            <p className="section-description">
              Comprehensive water leakage protection with cutting-edge technology 
              that delivers proven results and peace of mind.
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>24/7 Protection</h3>
              <p>Continuous monitoring with instant leak detection and automatic water shut-off to prevent costly property damage.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <h3>Instant Alerts</h3>
              <p>Immediate SMS and email notifications at the first sign of potential water leakage or abnormal flow patterns.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Smart Analytics</h3>
              <p>Detailed water usage statistics and consumption insights to optimize usage and reduce operational costs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-cogs"></i>
              </div>
              <h3>Remote Control</h3>
              <p>Manage your entire water system from anywhere through our secure, user-friendly web platform and mobile app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-animate services-section">
        <div className="container">
          <div className="section-header">
            <h6 className="section-subtitle">SOLUTIONS</h6>
            <h2 className="section-title">Complete Water Management Platform</h2>
            <p className="section-description">
              Everything you need to monitor, manage, and protect your property's water infrastructure in one integrated system.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              <h3>Live Dashboard</h3>
              <p>Real-time overview of all monitored pipelines, pressure levels, valve status, and system health indicators.</p>
              <button className="service-link">Discover More →</button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-bell"></i>
              </div>
              <h3>Smart Alerts</h3>
              <p>Customizable notifications for leaks, pressure changes, temperature fluctuations, and equipment issues.</p>
              <button className="service-link">Discover More →</button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-history"></i>
              </div>
              <h3>Activity Logs</h3>
              <p>Comprehensive historical data of all system events, maintenance activities, and performance metrics.</p>
              <button className="service-link">Discover More →</button>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-user-cog"></i>
              </div>
              <h3>Admin Portal</h3>
              <p>Advanced controls for system configuration, user management, automated reports, and maintenance scheduling.</p>
              <button className="service-link">Discover More →</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Protect Your Property with AquaFlow?</h2>
            <p>Join hundreds of property managers who trust our system to prevent water damage and reduce maintenance costs.</p>
            <button 
              className="cta-btn"
              onClick={() => handleAuthNavigation("/Login")}
            >
              Start Free Trial
            </button>
            <p className="cta-note">No credit card required • 30-day free trial</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img 
                  src="https://img.icons8.com/color/48/000000/water.png" 
                  alt="AquaFlow Logo" 
                  className="logo-img"
                />
                <h4>AquaFlow System</h4>
              </div>
              <p>Advanced water monitoring solutions for modern residential and commercial properties. Protecting your investments 24/7.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Access</h4>
              <ul>
                <li><button onClick={() => handleNavClick('home')}>Home</button></li>
                <li><button onClick={() => handleNavClick('why-choose-us')}>Features</button></li>
                <li><button onClick={() => handleNavClick('services')}>Services</button></li>
                <li><button onClick={() => handleNavClick('contact')}>Contact</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Our Solutions</h4>
              <ul className="solutions-list">
                <li>Leak Detection</li>
                <li>Water Monitoring</li>
                <li>Preventive Alerts</li>
                <li>Usage Analytics</li>
                <li>Mobile App</li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p><i className="fas fa-envelope"></i> srimathi@aquaflow.com</p>
              <p><i className="fas fa-phone"></i> +91 9345200277</p>
              <p><i className="fas fa-map-marker-alt"></i> 123 Tech Park, Innovation City</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © <span id="currentYear">{new Date().getFullYear()}</span> AquaFlow Pipeline Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
