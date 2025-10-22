const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const { message } = req.body;

    // Auto-fill from logged-in user
    const { customername, email } = req.customer;

    console.log("Contact form submitted by:", customername, email);

    // Save correctly with customername
    await Contact.create({
      customername,
      email,
      message,
    });

    res.status(200).json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = contactForm;
