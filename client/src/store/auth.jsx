import { createContext, useContext, useState, useEffect } from "react";

// Create Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Save/remove token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Login
  const login = (userData, jwtToken) => {
    setCustomer(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData)); // <-- Save here
  };

  // Logout
  const LogoutCustomer = () => {
    setCustomer(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
  };

  // Fetch currently logged-in user from backend
  const customerAuthentication = async () => {
    if (!token) return; // no token, no fetch
    try {
      const response = await fetch("http://localhost:5000/api/auth/customer", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user data:", data.customerData);
        setCustomer(data.customerData);
      } else {
        setCustomer(null); // invalid token
      }
    } catch (error) {
      console.log("Error fetching customer data", error);
    }
  };

  // Run authentication whenever token changes
  useEffect(() => {
    customerAuthentication();
  }, [token]); // <-- FIXED here

  let isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ customer, isLoggedIn, token, login, LogoutCustomer }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);

export { AuthContext };
