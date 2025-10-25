import React, { useState } from "react";
import "./HelpSupport.css";

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = [
    {
      question: "How do I interpret flow rate alerts?",
      answer: "Flow rate alerts indicate unusual water flow patterns. Normal flow is 5-15 L/min. Alerts trigger when flow exceeds 20 L/min or drops below 2 L/min for extended periods."
    },
    {
      question: "What should I do when I get a critical alert?",
      answer: "Critical alerts indicate potential leaks. Check the affected pipeline section immediately. The system will automatically shut off valves if auto-shutoff is enabled in settings."
    },
    {
      question: "How often is data updated?",
      answer: "Sensor data updates every 3 seconds. Historical data is stored based on your data retention settings (default: 30 days)."
    },
    {
      question: "Can I customize alert thresholds?",
      answer: "Yes, you can adjust flow rate and pressure thresholds in the Settings page under 'Alert Thresholds' section."
    }
  ];

  const contactMethods = [
    {
      method: "Email Support",
      details: "srimathi@aquaflow.com",
      response: "Within 24 hours"
    },
    {
      method: "Emergency Hotline",
      details: "+91 9345200277",
      response: "24/7 immediate assistance"
    },
    {
      method: "Technical Support",
      details: "tech@aquaflow.com",
      response: "Within 4 business hours"
    }
  ];

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="help-support-page">
      <div className="help-container">
        <div className="help-header">
          <h1>Help & Support Center</h1>
          <p>Find answers to common questions and get assistance</p>
        </div>

        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="help-tabs">
          <button
            className={`tab-button ${activeTab === "faq" ? "active" : ""}`}
            onClick={() => setActiveTab("faq")}
          >
            <i className="fas fa-question-circle"></i>
            FAQ
          </button>
          <button
            className={`tab-button ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            <i className="fas fa-phone"></i>
            Contact Support
          </button>
          <button
            className={`tab-button ${activeTab === "guides" ? "active" : ""}`}
            onClick={() => setActiveTab("guides")}
          >
            <i className="fas fa-book"></i>
            User Guides
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "faq" && (
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {filteredFaq.map((item, index) => (
                  <div key={index} className="faq-item">
                    <div className="faq-question">
                      <i className="fas fa-question"></i>
                      {item.question}
                    </div>
                    <div className="faq-answer">
                      <i className="fas fa-lightbulb"></i>
                      {item.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="contact-section">
              <h2>Contact Support</h2>
              <div className="contact-methods">
                {contactMethods.map((method, index) => (
                  <div key={index} className="contact-card">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-details">
                      <h3>{method.method}</h3>
                      <p className="contact-info">{method.details}</p>
                      <p className="response-time">Response: {method.response}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="emergency-notice">
                <i className="fas fa-exclamation-triangle"></i>
                <div>
                  <h3>Emergency Support</h3>
                  <p>For critical pipeline emergencies causing property damage or safety hazards, call our 24/7 emergency hotline immediately.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "guides" && (
            <div className="guides-section">
              <h2>User Guides & Documentation</h2>
              <div className="guides-grid">
                <div className="guide-card">
                  <div className="guide-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h3>System Overview Guide</h3>
                  <p>Learn how to navigate the dashboard and interpret key metrics</p>
                 
                </div>

                <div className="guide-card">
                  <div className="guide-icon">
                    <i className="fas fa-bell"></i>
                  </div>
                  <h3>Alert Management</h3>
                  <p>Understanding and responding to different types of alerts</p>
                 
                </div>

                <div className="guide-card">
                  <div className="guide-icon">
                    <i className="fas fa-cog"></i>
                  </div>
                  <h3>System Configuration</h3>
                  <p>Setting up thresholds, notifications, and system preferences</p>
                 
                </div>

                <div className="guide-card">
                  <div className="guide-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h3>Emergency Procedures</h3>
                  <p>Step-by-step guide for handling pipeline emergencies</p>
                 
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;