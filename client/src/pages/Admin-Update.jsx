import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";

const AdminUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customername: "",
    email: "",
    phone: "",
  });

  // ✅ Fetch single customer
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/admin/customers/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setFormData({
            customername: data.customername || "",
            email: data.email || "",
            phone: data.phone || "",
          });
        } else {
          toast.error(data.message || "Failed to fetch customer");
        }
      } catch (err) {
        toast.error("Error fetching customer data");
      }
    };

    fetchCustomer();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/admin/customers/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        navigate("/admin/customers");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Error updating customer");
    }
  };

  return (
  <div className="admin-update-container">
    <h2>Edit Customer</h2>
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        Name:
        <input
          type="text"
          name="customername"
          value={formData.customername}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="btn-update">
        Update
      </button>
    </form>
  </div>
);

};

export default AdminUpdate;
