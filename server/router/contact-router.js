const express = require("express");
const router = express.Router();
    
const contactForm = require("../controllers/contact-controllers");



//router.route("/contact").post(contactForm);
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/contact").post(authMiddleware, contactForm);





module.exports = router;