import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaInfoCircle, 
  FaConciergeBell, 
  FaStore, 
  FaEnvelope, 
  FaUserPlus, 
  FaSignInAlt 
} from "react-icons/fa";
import "./Navbar.css";
import { useAuth } from "../store/auth";
import logo from "../assets/logos.png";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="AMK Logo" className="logo-img" />
        <span className="logo-text">AMK Traders</span>
      </div>

      <div className="nav-links">
        {/* Always visible */}
        <NavLink 
          to="/" 
          className={({ isActive }) => (isActive ? "active-link" : "")}
        >
          <FaHome className="nav-icon" /> Home
        </NavLink>

        {/* Show only if logged in */}
        {isLoggedIn && (
          <>
            <NavLink 
              to="/about" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaInfoCircle className="nav-icon" /> About
            </NavLink>

            <NavLink 
              to="/service" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaConciergeBell className="nav-icon" /> Service
            </NavLink>

            <NavLink 
              to="/shop" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaStore className="nav-icon" /> Shop
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaEnvelope className="nav-icon" /> Contact
            </NavLink>
          </>
        )}

        {/* Auth Links */}
        {isLoggedIn ? (
          <NavLink 
            to="/logout" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaSignInAlt className="nav-icon" /> Logout
          </NavLink>
        ) : (
          <>
            <NavLink 
              to="/register" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaUserPlus className="nav-icon" /> Register
            </NavLink>

            <NavLink 
              to="/login" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <FaSignInAlt className="nav-icon" /> Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;