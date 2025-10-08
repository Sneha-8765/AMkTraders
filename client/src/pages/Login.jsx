import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";   // ✅ import toast
import "./Register.css";
import registerImg from "../assets/register.png";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Simple frontend validation
  const validateForm = () => {
    const { email, password } = loginData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address!");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        toast.error("Invalid credentials!");
        return;
      }

      const data = await response.json();
      console.log("Response JSON:", data);

      if (data.token) {
        login(data.user, data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login Successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="register-section">
      <div className="register-image">
        <img src={registerImg} alt="login" />
      </div>
      <div className="register-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
          <button type="submit">Login Now</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
