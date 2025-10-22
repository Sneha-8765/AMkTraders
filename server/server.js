require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

 
   const authRoute = require("./router/auth-router");

   const contactRoute = require("./router/contact-router");
   const productRoutes = require("./router/productRoutes");
   //const userRoutes = require("./router/user");
   const adminRoute = require("./router/admin-router");
   const connectDb = require("./utils/db");
const errormiddleware = require("./middlewares/error-middleware");
   //middleware it is use to handle the json payloads.
   app.use(cors()); 
   app.use(express.json());
 app.use("/api/auth",authRoute);
 app.use("/api/form",contactRoute);
 app.use("/api/products",productRoutes);
// app.use("/api/users", userRoutes);
// After other middleware
app.use('/uploads', express.static('uploads'));  // Serve files at http://localhost:5000/uploads/products/filename.jpg

app.use("/api/admin",adminRoute);



app.use(errormiddleware);




 const PORT = 5000;
connectDb().then(() =>{
app.listen(PORT ,() =>{
    console.log(`🚀 Server running at http://localhost:${PORT}`);
} );
});