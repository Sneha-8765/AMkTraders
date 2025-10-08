import  { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

import "./About.css";
import aboutImage from "../assets/Mainphoto.png"; // Replace with your actual image

export const About = () => {
  const [user, setUser] = useState(null);
  const { customer } = useAuth();

  useEffect(() => {
    // Get user from localStorage (after login)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <section className="about-section">
      <div className="about-container">
        {/* Left Image */}
        <div className="about-image">
          <img src={aboutImage} alt="About AMK" />
        </div>

        {/* Right Text Content */}
        <div className="about-content">
          <h2>About Us</h2>

          {/* 👇 Dynamic hello message */}
          
  <h3>
  Hello {user?.customerName || user?.name || user?.username || "Guest"}
</h3>



          <h3>
            Welcome to <span>AMK Traders</span>
          </h3>

          <p>
            At AMK Traders, we are dedicated to providing the highest quality salts
            for all your needs. Whether you're looking for gourmet salts for
            culinary excellence or industrial salts for various applications, we
            have you covered.
            <br />
            Our commitment to quality and customer satisfaction sets us apart.
            Explore our diverse range of products and discover the perfect salt
            for your requirements.
          </p>
        </div>
      </div>
    </section>
  );
};
export default About;