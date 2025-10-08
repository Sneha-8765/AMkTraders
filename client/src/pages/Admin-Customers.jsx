import { useEffect, useState } from "react";
import { toast } from "react-toastify";  
import "../index.css";
import { Link } from "react-router-dom";

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all customers
  const fetchCustomers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/customers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        toast.error("Unexpected response from server");
        setCustomers([]);
      }
    } catch (err) {
      toast.error("Error fetching customers");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ✅ Delete customer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/admin/customers/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setCustomers(customers.filter((cust) => cust._id !== id));
      } else {
        toast.error(data.message || "Failed to delete customer");
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
      toast.error("Error deleting customer");
    }
  };

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div className="admin-container">
      <h2>👥 Admin Customers</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>👤 Name</th>
            <th>📧 Email</th>
            <th>📱 Phone</th>
            <th>⭐ Admin?</th>
            <th>✏️ Update</th>
            <th>🗑️ Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map((cust) => (
              <tr key={cust._id}>
                <td>{cust.customername}</td>
                <td>{cust.email}</td>
                <td>{cust.phone}</td>
                <td>{cust.isAdmin ? "✅ Yes" : "❌ No"}</td>
                <td>
                  <Link to={`/admin/customers/${cust._id}/edit`} className="btn-update">
                    Edit
                  </Link>
                </td>
                <td>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(cust._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No customers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCustomers;
