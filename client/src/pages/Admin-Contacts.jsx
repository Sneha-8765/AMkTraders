import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";
import "../index.css"; // ✅ Custom CSS file

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(res.data);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        toast.error("Could not load contacts");
      }
    };

    fetchContacts();
  }, []);

  // ✅ Delete contact
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/admin/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setContacts(contacts.filter((c) => c._id !== id));
        toast.success("Contact deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete contact!");
        console.error("Delete error:", err);
      }
    }
  };

  return (
    <div className="admin-contacts-container">
      <ToastContainer />
      <div className="contacts-box">
        <h2>📩 Admin - Manage Contacts</h2>

        {contacts.length === 0 ? (
          <p className="no-data">No contacts available.</p>
        ) : (
          <div className="table-wrapper">
            <table className="contacts-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{contact.customername}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(contact._id)}
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContacts;
