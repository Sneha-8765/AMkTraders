import { NavLink, Outlet, Navigate } from "react-router-dom";
import { FaUsers, FaPhoneAlt } from "react-icons/fa"; // Removed unused icons
import axios from "axios";
import { useState, useEffect } from "react";

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Debug token
    if (token) {
      axios
        .get("/api/auth/customer", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("API Response:", res.data); // Debug full response
          const userData = res.data.customerData || {}; // Match backend response
          setIsAdmin(userData.isAdmin || false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user:", err.response ? err.response.data : err.message);
          setIsAdmin(false);
          setIsLoading(false);
        });
    } else {
      console.log("No token found");
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading admin dashboard...</div>;
  }

  console.log("isAdmin:", isAdmin); // Debug final state
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
              <li>
                <NavLink to="/admin/customers">
                  <FaUsers style={{ marginRight: "6px" }} />
                  Customers
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaPhoneAlt style={{ marginRight: "6px" }} />
                  Contacts
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;