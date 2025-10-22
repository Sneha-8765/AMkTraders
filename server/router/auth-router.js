const express = require("express");
const router = express.Router();
const authcontrollers= require("../controllers/auth-controller")
const { signupSchema, loginSchema }  =require("../validator/auth-validator");
const validate
= require("../middlewares/validate-middleware");
const authMiddleware =require("../middlewares/auth-middleware");



router.route("/").get(authcontrollers.home);
router.route("/register" ).post( validate(signupSchema),authcontrollers.register
);
router.route("/login").post(validate(loginSchema), authcontrollers.login); // applied here
router.route("/customer").get(authMiddleware , authcontrollers.customer);



module.exports = router;