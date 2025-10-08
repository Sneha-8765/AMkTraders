import React, { useState } from "react";
import "./Register.css";
import registerImg from "../assets/register.png";
import { toast } from "react-toastify";   // ✅ import toast
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [formData, setFormData] = useState({
    customername: "",
    email: "",
    phone: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Frontend Validation
  const validateForm = () => {
    const { customername, email, phone, password } = formData;

    if (customername.trim().length < 3) {
      toast.error("Name must be at least 3 characters long!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return false;
    }

    if (phone.length < 10) {
      toast.error("Phone number must be at least 10 digits!");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }

    return true;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if invalid

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Registration failed. Try again!");
        return;
      }

      const data = await response.json();
      console.log("Server Response:", data);

      toast.success("Registration Successful! 🎉");

      // ✅ Reset form fields
      setFormData({
        customername: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.log("register", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="register-section">
      {/* Left Side - Image */}
      <div className="register-image">
        <img src={registerImg} alt="register" />
      </div>

      {/* Right Side - Form */}
      <div className="register-form">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="customername"
            placeholder="Customername"
            value={formData.customername}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register Now</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
