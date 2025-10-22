 //home logic
 const Customer = require("../models/user-models");
 const bcrypt = require('bcryptjs');




 //home logic
 const home = async(req,res)=>{
    try{
          res.status(200).send("welcome to new website  ");
    }catch(error){
        console.log(error);
    }
 }
 //register logic
 const register = async (req, res)=>{
    try{
      //console.log(req.body);
      const { customername, email,phone,password}= req.body;

      const customerExists =  await Customer.findOne({email:email});
       if (customerExists){
         return res.status(400).json({message:"email already exists"});

       }
       const saltround = 10;
       const hash_password=  await bcrypt.hash(password,saltround );
        const customerCreated = await Customer.create({customername, email,phone,password:hash_password});

   res.status(200).json({msg:"registration Successfull", token:await customerCreated.generateToken(),customerId:customerCreated._id.toString(),});}
   catch(error){
    console.log(error);
    next(error);
   }}
    //login logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Do NOT exclude password here
    const customerExist = await Customer.findOne({ email });

    if (!customerExist) {
      return res.status(400).json({ success: false, msg: "Invalid credentials" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, customerExist.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, msg: "Invalid email or password" });
    }

    // Success → send back customer info (without password)
    res.status(200).json({
      success: true,
      msg: "Login successful",
      token: await customerExist.generateToken(),
      user: {
        _id: customerExist._id,
        customerName: customerExist.customername, // match your schema field
        email: customerExist.email,
        phone: customerExist.phone
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


// to send the customer data -customer logic
 // to send the customer data -customer logic
const customer = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const customerData = await Customer.findById(customerId).select("-password");
    if (!customerData) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.status(200).json({
      customerData: {
        _id: customerData._id,
        customername: customerData.customername,
        email: customerData.email,
        phone: customerData.phone,
       isAdmin: customerData.isAdmin || false // Add this
      }
    });
  } catch (error) {
    console.log(`error from the customer route ${error}`);
    res.status(500).json({ msg: "Server error" });
  }
};
  module.exports = { home, register ,login,customer };
  