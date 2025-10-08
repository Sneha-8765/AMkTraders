// src/pages/Service.jsx

//import React from "react";
import "./service.css";
import qualityIcon from "../assets/quality.png";
import packagingIcon from "../assets/custom.jpeg";
import deliveryIcon from "../assets/delivery.jpeg";

export const Service = () => {
  return (
    <section className="services-section">
      <div className="services-heading">
        <h2>Our Services</h2>
        <h3>What We Offer</h3>
      </div>

      <div className="services-cards">
        <div className="service-card">
          <img src={qualityIcon} alt="Product Quality Assurance" />
          <h4>Product Quality Assurance</h4>
          <a href="#!" className="learn-more">Learn More</a>
        </div>

        <div className="service-card">
          <img src={packagingIcon} alt="Custom Packaging Solutions" />
          <h4>Custom Packaging Solutions</h4>
          <a href="#!" className="learn-more">Learn More</a>
        </div>

        <div className="service-card">
          <img src={deliveryIcon} alt="Worldwide Delivery" />
          <h4>Worldwide Delivery</h4>
          <a href="#!" className="learn-more">Learn More</a>
        </div>
      </div>
    </section>
  );
};
export default Service;