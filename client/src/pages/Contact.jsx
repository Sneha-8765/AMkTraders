import React, { useState, useEffect } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { toast} from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

export const Contact = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    message: "",
  });

  // ✅ Fetch logged-in user details on mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/api/auth/customer", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Fetched user:", data);

        setFormData((prev) => ({
          ...prev,
          customerName:
            data.customerData?.customerName ||
            data.customerData?.customername ||
            "",
          email: data.customerData?.email || "",
        }));
      } catch (err) {
        console.error("Error fetching user data:", err);
        toast.error("❌ Failed to fetch user details");
      }
    };

    fetchUserData();
  }, []);

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Submit handler → sends data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ Message sent successfully!");
        setFormData((prev) => ({
          ...prev,
          message: "",
        }));
      } else {
        toast.error("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.error("❌ Failed to send message");
    }
  };

  return (
    <section className="contact-section">
      <h2>Contact</h2>
      <div className="contact-container">
        {/* Contact Info */}
        <div className="contact-info">
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <p>+91 7267813311</p>
          </div>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <p>Jaunpur, Uttar Pradesh</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <p>snehagupta8765@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={formData.customerName}
            onChange={handleChange}
            required
            readOnly // ✅ prevents editing if logged in
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly // ✅ prevents editing if logged in
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>

      
    </section>
  );
};

export default Contact;
