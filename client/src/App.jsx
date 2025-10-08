import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import AddProduct from "./Components/AddProduct";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Service from "./pages/Service";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Error from "./pages/Error";
import AdminLayout from "./Components/layouts/Admin-Layout"; // Corrected path
import AdminCustomers from "./pages/Admin-Customers";
import AdminContacts from "./pages/Admin-Contacts";
import AdminUpdate from "./pages/Admin-Update";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="customers/:id/edit" element={<AdminUpdate />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;