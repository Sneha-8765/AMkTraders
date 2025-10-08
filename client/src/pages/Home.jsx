// Home.jsx
import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";

import slide1 from "../assets/khadanamak.webp";
import slide2 from "../assets/phitkari.jpg";
import slide3 from "../assets/rock salt.jpeg";
import slide4 from "../assets/packet.jpeg";
import slide5 from "../assets/fruit image.webp";

export const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  const images = [slide1, slide2, slide3, slide4, slide5];

  return (
    <div className="home-slider">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} className="slide-img" />
            <div className="overlay">
              <h1 className="headline">Amritlal Krishna Mohan </h1>
              <p className="tagline">Wholesale seller of all types of salt</p>
              <button className="shop-button" onClick={() => navigate("/shop")}>
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
