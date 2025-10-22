const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// ✅ Import Contact model
const Contact = require("../models/contact-model");

// ✅ Customers Routes
router.route("/customers")
  .get(authMiddleware, adminMiddleware, adminController.getAllCustomers);

router.route("/customers/:id")
  .get(authMiddleware, adminMiddleware, adminController.getCustomerById);

router.route("/customers/update/:id")
  .patch(authMiddleware, adminMiddleware, adminController.updateCustomer);

router.route("/customers/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteCustomer);

// ✅ Contacts Routes
router.route("/contacts")
  .get(authMiddleware, adminMiddleware, adminController.getAllContacts);

// ✅ Delete Contact by ID
router.delete("/contacts/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error while deleting contact" });
  }
});

module.exports = router;
