const jwt = require("jsonwebtoken");
const Customer = require("../models/user-models");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized HTTP, Token not provided",
    });
  }

  // Remove Bearer prefix
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("Token from auth middleware:", jwtToken);

  try {
    // Verify token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETE_KEY);

    // Find customer, exclude password
    const customerData = await Customer.findOne({ email: isVerified.email }).select("-password");

    if (!customerData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach to request for next middleware/routes
    req.customer = customerData;
    req.token = jwtToken;
    req.customerID = customerData._id;

    console.log("Customer Data:", customerData);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized HTTP, Invalid token",
    });
  }
};

module.exports = authMiddleware;
